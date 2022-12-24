import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { User } from 'src/users/entities/user.entity';
import { Match } from './entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Match])],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
