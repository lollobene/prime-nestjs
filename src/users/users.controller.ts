import { Body, Controller, Get, Param, Patch, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { RolesGuard } from 'src/auth/strategy/roles.guard';
import { Roles } from 'src/custom.decorator';
import { UsersService } from 'src/users/users.service';
import { UpdateUserAdminDto } from './dto/update-user-admin';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /*
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
  */

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  @Get(':email')
  findOneByMail(@Param('email') email: string) {
    return this.userService.findOneByMail(email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.player)
  @Patch(':id')
  update(@Param('id') id: string, @Req() req, @Body() body) {
    return this.userService.update(id, req.user, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  @Put(':id')
  updateAdmin(@Param('id') id: string, @Req() req, @Body() body) {
    return this.userService.update(id, req.user, body);
  }
}
