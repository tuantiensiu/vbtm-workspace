import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { AppService } from '../app.service';
import { RedisService } from '../services/redis.service';
import { DataService } from '../services/data.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService,
    private redisService: RedisService,
    private dataService: DataService,

  ) { }

  getFiles(fileId: number, query) {
    const url = `${process.env.BASE_URL}/files/${fileId}/download?download_frd=${query.download_frd}&verifier=${query.verifier}`;
    return this.dataService.httpGet(url, '');

  }

}
