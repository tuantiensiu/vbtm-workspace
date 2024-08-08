import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { AppService } from '../app.service';
import { RedisService } from '../services/redis.service';
import { DataService } from '../services/data.service';

@Injectable()
export class QuizService {
  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService,
    private redisService: RedisService,
    private dataService: DataService,
  ) { }
  getQuizById(courseId: number, quizId: number, token: string) {
    const url = `${process.env.BASE_URL}/api/v1/courses/${courseId}/quizzes/${quizId}`;
    console.log(`get quiz by ID: ${url}`)
    return this.dataService.httpGet(url, token)
  }

  getQuizQuestion(courseId: number, quizId: number) {
    const url = `${process.env.BASE_URL}/api/v1/courses/${courseId}/quizzes/${quizId}/questions?per_page=50`;
    console.log(`get quiz question: ${url}`)
    return this.dataService.httpGet(url, process.env.TOKEN_SERVE);
  }

  getQuizSubmissions(courseId: number, quizId: number, token: string) {
    const url = `${process.env.BASE_URL}/api/v1/courses/${courseId}/quizzes/${quizId}/submissions`;
    console.log(`get quiz submission: ${url}`)

    return this.dataService.httpGet(url, token);
  }

  async postQuizSubmissions(courseId: number, quizId: number, token: string) {
    // console.log(courseId, quizId, token);
    const result = await this.httpService.post(`${process.env.BASE_URL}/api/v1/courses/${courseId}/quizzes/${quizId}/submissions`, null,
      {
        headers: this.appService.header(token)
      });
    console.log(result);

    return result.pipe(
      // map(response => response.data)
      map(response => this.appService.encryptAES(JSON.stringify(response.data), process.env.KEY))
    );
  }


  async postQuizSubmissionsComplete(courseId: number, quizId: number, submissionId: number, attempt: number, validation_token: string, token: string) {
    const result = await this.httpService.post(`${process.env.BASE_URL}/api/v1/courses/${courseId}/quizzes/${quizId}/submissions/${submissionId}/complete?validation_token=${validation_token}&attempt=${attempt}`,
      null,
      {
        headers: this.appService.header(token)

      });
    return result.pipe(
      // map(response => response.data)
      map(response => this.appService.encryptAES(JSON.stringify(response.data), process.env.KEY))
    );
  }

}
