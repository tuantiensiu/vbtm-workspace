import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { RedisService } from '../services/redis.service';
import { DataService } from '../services/data.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    // providers: [AppService]
    imports: [HttpModule],
    providers: [AppService, RedisService, DataService]
})
export class PageModule {}
