import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { QuizService } from './quiz.service';
import { RedisService } from '../services/redis.service';
import { DataService } from '../services/data.service';

@Module({
  imports: [HttpModule],
  providers: [ AppService, RedisService, DataService],

})
export class QuizModule {}
