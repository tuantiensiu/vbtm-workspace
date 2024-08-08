import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, tap } from 'rxjs';
import { AppService } from '../app.service';

@Injectable()
export class UploadService {
    constructor(
        private readonly httpService: HttpService,
        private readonly appService: AppService

    ){}

    uploadFileAssignment(data, file, token: string){
        // return 'upload file';
        // console.log(data.upload_url);
        // console.log(file);
    return this.httpService.post(data.upload_url,
            {
                'filename' : file.originalname,
                'file' : file.path,
                'content-type' : 'multipart/form-data'
            },
            {
                'headers': this.appService.header(token)
            }
            
            ).pipe(map(response_file => response_file.data), tap(data => console.log(data)));
    }
}
