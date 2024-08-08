import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { AppService } from '../app.service';
import { DataService } from '../services/data.service';
import { RedisService } from '../services/redis.service';


@Injectable()
export class ModulesService {

  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService,
    private redisService: RedisService,
    private dataService: DataService

  ) { }

  getModules(courseId: number, token: string) {
    const url = `${process.env.BASE_URL}/api/v1/courses/${courseId}/modules?per_page=50`;
    return this.dataService.httpGet(url, token)
  }

  getModuleItem(courseId: number, moduleId: number, token: string, include: string, perPage: string) {
    const url = `${process.env.BASE_URL}/api/v1/courses/${courseId}/modules/${moduleId}/items?include[]=${include}&per_page=${perPage}`;
    return this.dataService.httpGet(url, token)

  }
}
