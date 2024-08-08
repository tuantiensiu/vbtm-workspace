import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, switchMap, tap } from 'rxjs';
import { AppService } from '../app.service';
import { UploadService } from '../upload/upload.service';


@Injectable()
export class AssignmentService {
    file = ''
    constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService,
    private readonly uploadService: UploadService
) {}



     getAssignment(courseId:number, assignmentId:number, token: string){
        return this.httpService.get(`${process.env.BASE_URL}/api/v1/courses/${courseId}/assignments/${assignmentId}`,
        {
            'headers': this.appService.header(token)
        } ).pipe(
            // map(response => response.data)
            map(response => this.appService.encryptAES(JSON.stringify(response.data), process.env.KEY))
            );
    }

    getAssignmentHistory(courseId:number, assignmentId:number, userId:number ,include: string, token: string){
      console.log(token, include);
      
        return this.httpService.get(`${process.env.BASE_URL}/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}?include[]=submission_history`,
        {
            'headers': this.appService.header(token)
        } ).pipe(
            // map(response => response.data)
            map(response => this.appService.encryptAES(JSON.stringify(response.data), process.env.KEY))
            );
    }
    postAssignment(courseId:number, assignmentId:number, userId:number, file, token: string){
      return this.httpService.post(`${process.env.BASE_URL}/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}/files`,
            {
                'name' : file.originalname,
                'parent_folder_path' : file.path,
                'size' : file.size,
            },
            {
                'headers': this.appService.header(token)
            }
        ).pipe(
            switchMap(response => this.uploadService.uploadFileAssignment(response.data, file, token)),
            tap(data => console.log(data)
         ) );


    }

    uploadFile(data, file, token: string){
        return this.httpService.post(data.upload_url,
            {
                'filename' : file.originalname,
                'file' : file.path,
                'content-type' : 'multipart/form-data'
            },
            {
                'headers': this.appService.header(token)
            }

            ).pipe(map(response => response.data));
    }

}
