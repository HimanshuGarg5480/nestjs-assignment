import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Query,
    Body,
    UseGuards,
    ParseIntPipe
  } from '@nestjs/common';
  import { CatsService } from './cats.service';
  import { CreateCatDto } from './dto/create-cat.dto';
  import { UpdateCatDto } from './dto/update-cat.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../guards/roles.guard';
  import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
  import { createCatSchema, updateCatSchema } from '../schemas/cat.schema';
  
  @Controller('cats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class CatsController {
    constructor(private readonly catsService: CatsService) {}
  
    @Get()
    async findAll() {
      return await this.catsService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return await this.catsService.findOne(id);
    }
  
    @Get('search')
    async findByAgeRange(
      @Query('age_gte', ParseIntPipe) age_gte: number,
      @Query('age_lte', ParseIntPipe) age_lte: number,
    ) {
      return await this.catsService.findByAgeRange(age_gte, age_lte);
    }
  
    @Post()
    async create(@Body(new JoiValidationPipe(createCatSchema)) createCatDto: CreateCatDto) {
      return await this.catsService.create(createCatDto);
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body(new JoiValidationPipe(updateCatSchema)) updateCatDto: UpdateCatDto,
    ) {
      return await this.catsService.update(id, updateCatDto);
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      await this.catsService.remove(id);
      return { message: 'Cat successfully deleted' };
    }
  }
  