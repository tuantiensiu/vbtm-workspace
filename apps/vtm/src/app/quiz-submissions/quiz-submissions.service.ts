import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AppService } from '../app.service';
import { map } from 'rxjs';
import pRetry from 'p-retry';
import { RedisService } from '../services/redis.service';
import { DataService } from '../services/data.service';

@Injectable()
export class QuizSubmissionsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService,
    private redisService: RedisService,
    private dataService: DataService,
    ) {}

    async getQuizSumission(id: number, token: string){
      const url = `${process.env.BASE_URL}/api/v1/quiz_submissions/${id}/questions`;
      console.log(`get quiz by ID: ${url}`)
      return this.dataService.httpGet(url, token)
    };

   async postQuizSumission(id: number, token: string, attempt: string, validation_token: string, quiz_questions: any){
       const header = {
                // 'responContent-Type': 'application/json',
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/json; charset=UTF-8',
            };
      const url = `${process.env.BASE_URL}/api/v1/quiz_submissions/${id}/questions`;
      const data = {
              attempt: attempt,
              validation_token: validation_token,
              quiz_questions: quiz_questions
      };
    const result = await this.httpService.post(url, JSON.stringify(data), {headers: header})
      return result.pipe(map(response => this.appService.encryptAES(JSON.stringify(response.data), process.env.KEY)));
    }
}
