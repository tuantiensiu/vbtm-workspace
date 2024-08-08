import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('courses/:courseId/quizzes/:quizId')
export class QuizController {
    constructor(private quizService:QuizService){}

    @Get()
    getQuizById(@Param('courseId') courseId: string, @Param('quizId') quizId: string, @Query('token') token: string){
        return this.quizService.getQuizById(Number(courseId), Number(quizId), String(token))
        // return this.assignmentService.getAssignment(Number(courseId), Number(assignmentId));
    }

    @Get('/questions')
    getQuizQuestion(@Param('courseId') courseId: string, @Param('quizId') quizId: string){
        // return this.quizService.getQuizById(Number(courseId), Number(quizId))
        return this.quizService.getQuizQuestion(Number(courseId), Number(quizId));
    }

    @Get('/submissions')
    getQuizSubmissions(@Param('courseId') courseId: string, @Param('quizId') quizId: string,  @Query('token') token: string){
        // return this.quizService.getQuizById(Number(courseId), Number(quizId))
        return this.quizService.getQuizSubmissions(Number(courseId), Number(quizId), String(token));
    }

    @Post('/submissions')
    postQuizSubmissions(@Param('courseId') courseId: string, @Param('quizId') quizId: string,  @Query('token') token: string){
        // return this.quizService.getQuizById(Number(courseId), Number(quizId))
        return this.quizService.postQuizSubmissions(Number(courseId), Number(quizId), String(token));
    }

    @Post('/submissions/:submissionId/complete')
    postQuizSubmissionsComplete(@Param('courseId') courseId: string, @Param('quizId') quizId: string, @Param('submissionId') submissionId: string , @Body('attempt') attempt: string, @Body('validation_token') validation_token: string , @Query('token') token: string){
        // return this.quizService.getQuizById(Number(courseId), Number(quizId))
      return this.quizService.postQuizSubmissionsComplete(Number(courseId), Number(quizId), Number(submissionId), Number(attempt), String(validation_token) , String(token));
    }
}
