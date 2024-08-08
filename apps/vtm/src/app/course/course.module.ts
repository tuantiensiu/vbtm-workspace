import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { CourseService } from './course.service';
import { RedisService } from '../services/redis.service';
import { DataService } from '../services/data.service';

@Module({
  providers: [CourseService, AppService, RedisService, DataService],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
})
export class CourseModule { }
