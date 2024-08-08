import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, firstValueFrom } from 'rxjs';
import { getPlayHash } from '../../services/crypto';
import { AppService } from '../app.service';
import { RedisService } from '../services/redis.service';
import { DataService } from '../services/data.service';

@Injectable()
export class PageService {
    constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService,
    private redisService: RedisService,
    private dataService: DataService,

) {}

async getPage(courseId:number, url:string, token: string){
    const _url = `${process.env.BASE_URL}/api/v1/courses/${courseId}/pages/${url}`;
    const result = await this.dataService.httpGetDataPage(_url, token);
    return result;
  }


  async getDataFromJsonFile(url: string){
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  convertString(str: string) {
    //chuyen chuoi <p>bai1/bai2</p> => bai1.bai2
    return str.replace(/<\/?p>/g, "").replace(/\//g, ".");
  }
}

