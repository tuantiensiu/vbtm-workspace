import {  Controller, Get, Param, Post, UploadedFile, UseInterceptors, Query } from '@nestjs/common';
import {  FileInterceptor } from '@nestjs/platform-express';
import { AssignmentService } from './assignment.service';

@Controller('courses/:courseId/assignments/:assignmentId')
export class AssignmentController {
    constructor(private assignmentService:AssignmentService){}

    @Get()
    getAssignment(@Param('courseId') courseId: string, @Param('assignmentId') assignmentId: string, @Query('token') token: string){
        return this.assignmentService.getAssignment(Number(courseId), Number(assignmentId), String(token));
    }

    @Post('submissions/:userId/files')
    @UseInterceptors(FileInterceptor('file', {dest: "./uploads"}))
    postAssignment(@Param('courseId') courseId: string, @Param('assignmentId') assignmentId: string, @Param('userId') userId: string, @UploadedFile() file, @Query('token') token: string){
        // return {courseId, assignmentId, userId}
        return this.assignmentService.postAssignment(Number(courseId), Number(assignmentId), Number(userId), file, String(token))
    }

    @Get('submissions/:userId')
    getAssignmentHistory(@Param('courseId') courseId: string, @Param('assignmentId') assignmentId: string, @Param('userId') userId: string, @Param('include[]') include:string,  @Query('token') token: string){
        // return {courseId, assignmentId, userId}
        return this.assignmentService.getAssignmentHistory(Number(courseId), Number(assignmentId), Number(userId), String(include), String(token))
    }
    // @Post('submissions/:userId/files')
    // @UseInterceptors(FileInterceptor('file', {dest: "./uploads"}))
    // uploadFile(@Param('url') url:string, @UploadedFile() file){
    //     return this.assignmentService.uploadFile(String(url), file);
    // },

}

