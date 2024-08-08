import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisService } from './services/redis.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseController } from './course/course.controller';
import { CourseModule } from './course/course.module';
import { CourseService } from './course/course.service';
import { AssignmentService } from './assignment/assignment.service';
import { AssignmentController } from './assignment/assignment.controller';
import { AssignmentModule } from './assignment/assignment.module';
import { ModulesService } from './modules/modules.service';
import { ModulesModule } from './modules/modules.module';
import { QuizController } from './quiz/quiz.controller';
import { QuizModule } from './quiz/quiz.module';
import { QuizService } from './quiz/quiz.service';
import { PageService } from './page/page.service';
import { PageController } from './page/page.controller';
import { PageModule } from './page/page.module';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { UploadService } from './upload/upload.service';
import { LoginService } from './login/login.service';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';
import { QuizSubmissionsModule } from './quiz-submissions/quiz-submissions.module';
import { QuizSubmissionsService } from './quiz-submissions/quiz-submissions.service';
import { QuizSubmissionsController } from './quiz-submissions/quiz-submissions.controller';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { FilesController } from './files/files.controller';
import { FilesModule } from './files/files.module';
import { FilesService } from './files/files.service';
import { DataService } from './services/data.service';


const getClients = (redisMode: string): any[] => {

  const nodes = [];
  const nodeEndpoints = process.env.REDIS_NODES ? process.env.REDIS_NODES.split(',') : ['localhost'];
  for (let i = 0; i < nodeEndpoints.length; i++) {
    nodes.push({
      host: nodeEndpoints[i],
      port: '6379'
    })
  }
  // console.log('Redis Clients:', nodes);
  return nodes;
}


const singleModule = [
  RedisModule.forRoot({
    readyLog: true,
    errorLog: true,
    commonOptions: process.env.REDIS_MODE === "sentinel" ? {
      name: process.env.SENTINEL_NAME || "mymaster",
      sentinels: getClients("sentinel"),
      sentinelPassword: process.env.REDIS_PASSWORD || "iamredis",
      password: process.env.REDIS_PASSWORD || "iamredis",
    } : {},
    config: process.env.REDIS_MODE === "sentinel" ? [
      {
        // get master node from the sentinel group
        role: 'master',
        onClientCreated(client) {
          client.on('error', err => {
            console.log('onClientCreated:', err);
          });
          client.on('ready', () => {
            console.log('onClientCreated: Create Redis client successfully');
          });
        },
        reconnectOnError(err) {
          console.log('master:', err);
          const targetError = "READONLY";
          if (err.message.includes(targetError)) {
            // Only reconnect when the error contains "READONLY"
            return true; // or `return 1;`
          }
        },
      },
      // {
      // 	// get a random slave node from the sentinel group
      // 	role: 'slave',
      // 	onClientCreated(client) {
      // 		client.on('error', err => {
      // 			console.log('onClientCreated:', err);
      // 		});
      // 		client.on('ready', () => {
      // 			console.log('onClientCreated: Create Redis client successfully');
      // 		});
      // 	},
      // 	reconnectOnError(err) {
      // 		console.log('slave:', err);
      // 		const targetError = "READONLY";
      // 		if (err.message.includes(targetError)) {
      // 			// Only reconnect when the error contains "READONLY"
      // 			return true; // or `return 1;`
      // 		}
      // 	},
      // }
    ] : {
      host: process.env.REDIS_NODES ? process.env.REDIS_NODES.split(',')[0] : 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || 'iamredis',
      onClientCreated(client) {
        client.on('error', err => {
          console.log('onClientCreated:', err);
        });
        client.on('ready', () => {
          console.log('onClientCreated: Create Redis client successfully');
        });
      },
      reconnectOnError(err) {
        console.log('master:', err);
        const targetError = "READONLY";
        if (err.message.includes(targetError)) {
          // Only reconnect when the error contains "READONLY"
          return true; // or `return 1;`
        }
      },
    }
  })
]
@Module({
  imports: [
    RouterModule.register([
      {
        path: 'course',
        module: CourseModule,
        children: [
          {
            path: '/:courseId/assignments',
            module: AssignmentModule,
          },
          // {
          //   path: '/:courseId/modules',
          //   module: ModulesModule,
          // },
          // {
          //   path: 'metrics',
          //   module: MetricsModule,
          // },
        ],
      },
    ],

    ),

    CourseModule,
    HttpModule,
    AssignmentModule,
    ModulesModule,
    QuizModule,
    PageModule,
    UploadModule,
    LoginModule,
    QuizSubmissionsModule,
    UsersModule,
    FilesModule,
  ]// For redis single and sentinel module or cluster module
    .concat(singleModule),
  controllers: [
    AppController,
    CourseController,
    AssignmentController,
    QuizController,
    PageController,
    UploadController,
    LoginController,
    QuizController,
    QuizSubmissionsController,
    UsersController,
    FilesController,
  ],
  providers: [
    AppService,
    CourseService,
    AssignmentService,
    ModulesService,
    QuizService,
    PageService,
    UploadService,
    LoginService,
    QuizSubmissionsService,
    FilesService,
    RedisService,
    DataService
  ],
})
export class AppModule { }
