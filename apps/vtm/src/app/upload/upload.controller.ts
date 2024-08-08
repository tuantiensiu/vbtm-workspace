import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
    constructor(private uploadService:UploadService){}

    @Get()
    getUploadFile(){
        return 'api upload';
    }

    @Post()
    uploadFile(@Param('data') data: string, file, @Query('token') token: string){
        return this.uploadService.uploadFileAssignment(Number(data), file, String(token));
    }
}
