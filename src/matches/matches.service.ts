import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match) private readonly matchesRepository: Repository<Match>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const match = new Match();

    const creator = await this.usersRepository.findOne({
      id: createMatchDto.creatorId,
    });

    match.dateTime = createMatchDto.dateTime;
    match.location = createMatchDto.location;
    match.creator = creator;

    return this.matchesRepository.save(match);
  }

  findAll() {
    return this.matchesRepository.find();
  }

  findOne(id: number) {
    return this.matchesRepository.findOne({
      id,
    });
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return this.matchesRepository.update(id, updateMatchDto);
  }

  async remove(id: number) {
    return await this.matchesRepository.delete(id);
  }
}
