import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { UsersDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';
import { validate } from 'class-validator';
import { LoggerService } from 'src/logger/logger.service';
import { UpdateUserAdminDto } from './dto/update-user-admin';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly logger: LoggerService = new Logger(UsersService.name),
  ) {}

  create(createUserDto: UsersDTO): Promise<User> {
    const user = new User();

    user.name = createUserDto.name;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.avatar = createUserDto.avatar;
    user.description = createUserDto.description;
    createUserDto.secretKey ? (user.roles = [Role.admin, Role.player]) : null;

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByMail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      email,
    });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({
      id,
    });
  }

  async update(id: string, user: User, body: any) {
    let isOk = false;
    let updateUserDto;

    if (user.roles.some((role) => role === Role.admin)) {
      updateUserDto = new UpdateUserAdminDto();
      if (body.categories) updateUserDto.categories = body.categories;
      if (body.role) updateUserDto.role = body.role;
      if (body.email) updateUserDto.email = body.email;
    } else {
      if (user.id === id) {
        updateUserDto = new UpdateUserDto();
        if (body.name) updateUserDto.name = body.name;
        if (body.username) updateUserDto.username = body.username;
        if (body.avatar) updateUserDto.avatar = body.avatar;
      } else {
        this.logger.debug(`${user.id} cannot update User ${id} info.`);
        throw new Error(`${user.id} cannot update User ${id} info.`);
      }
    }

    // TODO: Refactor this section with try catch block and return error message in the catch block
    // Validate DTO against validate function from class-validator
    await validate(updateUserDto).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`);
      } else {
        isOk = true;
      }
    });
    if (isOk) {
      return this.usersRepository.update(id, updateUserDto);
    }
  }

  /*
  async updateAdmin(id: string, body: any) {
    let isOk = false;

    const updateUserAdminDto = new UpdateUserAdminDto();
    if (body.categories) updateUserAdminDto.categories = body.categories;
    if (body.role) updateUserAdminDto.role = body.role;
    if (body.email) updateUserAdminDto.email = body.email;

    // TODO: Refactor this section with try catch block and return error message in the catch block
    // Validate DTO against validate function from class-validator
    await validate(updateUserAdminDto).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`);
      } else {
        isOk = true;
      }
    });

    if (isOk) {
      // const user = await this.usersRepository.findOne(id);
      // updateUserAdminDto.email = user.email;
      return this.usersRepository.update(id, updateUserAdminDto);
    }
  }
  */

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
