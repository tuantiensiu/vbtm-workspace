import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { AppService } from '../app.service';
import { RedisService } from '../services/redis.service';
import { DataService } from '../services/data.service';

@Injectable()
export class CourseService {

  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService,
    private redisService: RedisService,
    private dataService: DataService,

  ) { }

  async getAllCourse(token: string) {
    const url = `${process.env.BASE_URL}/api/v1/dashboard/dashboard_cards`;
    return this.dataService.httpGetCourse(url, token)

  }


  getCourseById(courseId: number, token: string) {
    const url = `${process.env.BASE_URL}/api/v1/courses/${courseId}?include[]=syllabus_body`;
    return this.dataService.httpGet(url, token)
  }

  getFileDownload(courseId: number, file_id: number, token: string) {
    const url = `${process.env.BASE_URL}/api/v1/courses/${courseId}/files/${file_id}`;
    return this.dataService.httpGet(url, token);
  }

  getDiscussion(courseId: number, discussionId: number, token: string) {
    const url = `${process.env.BASE_URL}/api/v1/courses/${courseId}/discussion_topics/${discussionId}`;
    return this.dataService.httpGet(url, token);
  }

  async getDisccussionEntries(courseId: number, discussionId: number, token: string) {
    const url = `${process.env.BASE_URL}/api/v1/courses/${courseId}/discussion_topics/${discussionId}/entries`;
    return this.dataService.httpGet(url, token);
  }

  async postDisccussion(courseId: number, discussionId: number, token: string, message: any) {

    const header = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json; charset=UTF-8',
    };
    const data = {
      message: message
    };

    const result = await this.httpService.post(`${process.env.BASE_URL}/api/v1/courses/${courseId}/discussion_topics/${discussionId}/entries`, JSON.stringify(data), { headers: header })


    return result.pipe(map(response => this.appService.encryptAES(JSON.stringify(response.data), process.env.KEY)));

  }

  async putDisccussion(courseId: number, discussionId: number, entrieId: number, token: string, message: any) {

    const header = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json; charset=UTF-8',
    };
    const data = {
      message: message
    }
    const result = await this.httpService.put(`${process.env.BASE_URL}/api/v1/courses/${courseId}/discussion_topics/${discussionId}/entries/${entrieId}`, JSON.stringify(data), { headers: header })

    return result.pipe(map(response => this.appService.encryptAES(JSON.stringify(response.data), process.env.KEY)));
  }
}
