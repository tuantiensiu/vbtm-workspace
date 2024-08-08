import { Controller, Get, Param, Query } from '@nestjs/common';
import { PageService } from './page.service';

@Controller('courses/:courseId/pages/:url')
export class PageController {
    constructor(private pageService:PageService){}


    @Get()
    getAssignment(@Param('courseId') courseId: string, @Param('url') url: string, @Query('token') token: string){
    //    return {courseId, url}
        return this.pageService.getPage(Number(courseId), String(url), String(token));
    }
}
