import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { QuizSubmissionsController } from './quiz-submissions.controller';
import { QuizSubmissionsService } from './quiz-submissions.service';
import { RedisService } from '../services/redis.service';
import { DataService } from '../services/data.service';

@Module({
  // controllers: [QuizSubmissionsController],
  providers: [AppService, RedisService],
})
export class QuizSubmissionsModule {}
