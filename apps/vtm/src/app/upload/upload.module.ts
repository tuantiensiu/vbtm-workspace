import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { AppService } from '../app.service';

@Module({
  providers: [UploadService, AppService ],
  imports: [HttpModule]
})
export class UploadModule {}
