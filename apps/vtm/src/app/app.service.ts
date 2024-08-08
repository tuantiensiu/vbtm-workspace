import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto'



@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to vtm!' };
  }

  encryptAES = (content: any, secret: string) => {
        const iv = secret.slice(0, secret.length / 2);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secret), Buffer.from(iv));
        // Logger.verbose(secret: ${secret}, iv: ${iv});
        let encrypted = cipher.update(content);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted;
     };

  header(token: string) {
    return {
        'responContent-Type': 'application/json',
        'Authorization': 'Bearer ' + token}
  }

}
