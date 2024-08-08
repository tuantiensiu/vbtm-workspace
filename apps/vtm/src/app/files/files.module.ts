import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { FilesService } from './files.service';
import { RedisService } from '../services/redis.service';
import { DataService } from '../services/data.service';

@Module({
  providers: [ AppService, RedisService ],
})
export class FilesModule {}
