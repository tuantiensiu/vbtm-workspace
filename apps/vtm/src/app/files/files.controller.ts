import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private fileService:FilesService){}

  @Get(':fileId/download')
    getFile(
      @Param('fileId') fileId: string,
      // @Query('token') token: string,
      @Query() query: string,
    ){
      // console.log(query);

      return this.fileService.getFiles(Number(fileId), Object(query) )};
    // ){return this.fileService.getFiles(Number(fileId), String(download),String(token))};


}
