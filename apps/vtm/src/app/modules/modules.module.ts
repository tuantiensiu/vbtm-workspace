import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { RedisService } from '../services/redis.service';
import { DataService } from '../services/data.service';

@Module({
  imports: [HttpModule],
  controllers: [ModulesController],
  providers: [ ModulesService, AppService, RedisService, DataService]
})
export class ModulesModule {}
