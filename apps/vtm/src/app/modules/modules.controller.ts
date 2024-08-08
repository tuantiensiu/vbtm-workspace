import { Controller, Get, Param, Query } from '@nestjs/common';
import { ModulesService } from './modules.service';

@Controller('courses/:courseId/modules')
export class ModulesController {
    constructor(private modulesService:ModulesService){}

    @Get()
    getModules(@Param('courseId') courseId: string, @Query('token') token: string){
        return this.modulesService.getModules(Number(courseId), String(token))
    }

    @Get(':moduleId/items')
    getModuleItem(@Param('courseId') courseId: string, @Param('moduleId') moduleId: string, @Query('token') token: string, @Query('include') include: string, @Query('per_page') perPage: string){
        return this.modulesService.getModuleItem(Number(courseId), Number(moduleId), String(token), String(include), String(perPage));
    }
}
