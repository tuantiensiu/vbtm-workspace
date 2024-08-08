import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { AppService } from '../app.service';

const header = {
    'responContent-Type': 'application/json', 
    'Authorization': 'Bearer 8ee5a7e6-1948-43f6-85d0-56fd10863188',
    'auth-provider': 'dbAuth'
}

@Injectable()
export class LoginService {
    constructor(
        private readonly httpService: HttpService,
        private readonly appService: AppService
    
    ) {} 
    
    login(){
        return this.httpService.post(`http://localhost:8911/.redwood/functions/graphql`, 
        {
            'headers': header
        } ).pipe(
            map(response => response)
            // map(response => this.appService.encryptAES(JSON.stringify(response.data), process.env.KEY))
            );
    }
}
