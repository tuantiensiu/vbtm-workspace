import 'dotenv/config';
import { HttpServer, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RedisService } from './redis.service';
import { AppService } from '../app.service';
import { Observable, firstValueFrom, map } from 'rxjs';
import { getPlayHash } from '../../services/crypto';
@Injectable()
export class DataService {
  private client: HttpServer;
  constructor(
    private readonly httpService: HttpService,
    private redisService: RedisService,
    private readonly appService: AppService,

  ) {

  }

  async httpGet(url: string, token: string): Promise<any> {
    const keyExist = this.redisService.status() === 'ready' ? await this.redisService.exists(url) : undefined;

    if (keyExist === 0) {
      console.log(`set redis ${url}`);
      const response$ = this.httpService.get(url, {
        headers: this.appService.header(token),
      }).pipe(
        map(response => response.data), // Extract data from the response
        map(data => this.appService.encryptAES(JSON.stringify(data), process.env.KEY)), // Encrypt data
      );

      // Subscribe to the observable to trigger the HTTP request
      const data = await response$.toPromise();
      await this.redisService.set(url, data);

      return data;
    } else {
      // prefetch data
      console.log(`get redis ${url}`);
      return await this.redisService.getBuffer(url);
    }
  }

  async httpGetCourse(url: string, token: string): Promise<any> {
    const newUrl = 'dashboard_cards_'+token;
    const keyExist = this.redisService.status() === 'ready' ? await this.redisService.exists(newUrl) : undefined;

    if (keyExist === 0) {
      console.log(`set redis ${newUrl}`);
      const response$ = this.httpService.get(url, {
        headers: this.appService.header(token),
      }).pipe(
        map(response => response.data), // Extract data from the response
        map(data => this.appService.encryptAES(JSON.stringify(data), process.env.KEY)), // Encrypt data
      );

      // Subscribe to the observable to trigger the HTTP request
      const data = await response$.toPromise();
      await this.redisService.set(newUrl, data);

      return data;
    } else {
      // prefetch data
      console.log(`get redis ${newUrl}`);
      return await this.redisService.getBuffer(newUrl);
    }
  }

  async httpGetDataPage(url: string, token: string): Promise<any> {
    const keyExist = this.redisService.status() === 'ready' ? await this.redisService.exists(url) : undefined;
    const dataJson = await this.getDataFromJsonFile(`${process.env.URL_GIT}`);

     if (keyExist === 0) {
      console.log(`set redis ${url}`);
      const response$ = this.httpService.get(url, {
        headers: this.appService.header(token),
      }).pipe(
        map(response => response.data), // Extract data from the response
      );

      // Subscribe to the observable to trigger the HTTP request
      const data = await response$.toPromise();
      const urlTransform = this.convertString(data.body);
      const jsonHash =  await this.getDataFromJsonFile(dataJson.json_gateway+urlTransform+'.json');
      const streamHash = await getPlayHash(jsonHash.url, jsonHash.hash);
      data.hash = streamHash;

      const dataConvert =  this.appService.encryptAES(JSON.stringify(data), process.env.KEY);
      await this.redisService.set(url, dataConvert);

      return dataConvert;

    } else {
      // prefetch data
      console.log(`get redis ${url}`);
      return await this.redisService.getBuffer(url);

    }
  }


  async getDataFromJsonFile(url: string){
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  convertString(str: string) {
    //chuyen chuoi <p>bai1/bai2</p> => bai1.bai2
    return str.replace(/<\/?p>/g, "").replace(/\//g, ".");
  }


}
