import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QuizSubmissionsService } from './quiz-submissions.service';

@Controller('quiz_submissions/:id/questions')
export class QuizSubmissionsController {
  constructor(private quizSubmissionService: QuizSubmissionsService){}

  @Get()
  getQuizSumission(@Param('id') id:string, @Query('token') token: string){
    return this.quizSubmissionService.getQuizSumission(Number(id), String(token))
  }

  @Post()
  postQuizSumission(@Param('id') id:string, @Query('token') token: string, @Body('attempt') attempt: string, @Body('validation_token') validation_token: string, @Body('quiz_questions') quiz_questions: any,){
    return this.quizSubmissionService.postQuizSumission(Number(id), String(token), String(attempt), String(validation_token), quiz_questions)
  }
}
