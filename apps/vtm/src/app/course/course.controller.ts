import { Controller, Get, Param, Query, Post, Body, Put } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
    constructor(private courseService:CourseService){}

   @Get()
    getAllCourse(
      @Query('token') token: string
    ){return this.courseService.getAllCourse(String(token))};

    @Get(':id')
    getCourseById(@Param('id') id: string, @Query('token') token: string){

        return this.courseService.getCourseById(Number(id), String(token));
    }

    @Get(':id/files/:file_id')
    getFileDownload(@Param('id') id:string, @Param('file_id') file_id:string,  @Query('token') token: string ){
        return this.courseService.getFileDownload(Number(id), Number(file_id), String(token));
    }

    @Get(':courseId/discussion_topics/:discussionId')
    getDiscussion(@Param('courseId') courseId:string, @Param('discussionId') discussionId:string,  @Query('token') token: string ){
        return this.courseService.getDiscussion(Number(courseId), Number(discussionId), String(token));
      }

    @Get(':courseId/discussion_topics/:discussionId/entries')
    getDiscussionEntrie(@Param('courseId') courseId:string, @Param('discussionId') discussionId:string,  @Query('token') token: string ){
        return this.courseService.getDisccussionEntries(Number(courseId), Number(discussionId), String(token));
      }

    @Post(':courseId/discussion_topics/:discussionId/entries')
    postDiscussion(@Param('courseId') courseId:string, @Param('discussionId') discussionId:string,  @Query('token') token: string, @Body('message') message: any ){
        return this.courseService.postDisccussion(Number(courseId), Number(discussionId), String(token), message);
    }

    @Put(':courseId/discussion_topics/:discussionId/entries/:entrieId')
    putDiscussion(@Param('courseId') courseId:string, @Param('discussionId') discussionId:string, @Param('entrieId') entrieId:string,  @Query('token') token: string, @Body('message') message: any ){
        return this.courseService.putDisccussion(Number(courseId), Number(discussionId), Number(entrieId), String(token), message);
    }

}
