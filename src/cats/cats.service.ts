import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Cat } from '../entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private readonly catRepository: Repository<Cat>) {}

  async findAll(): Promise<Cat[]> {
    return await this.catRepository.find();
  }

  async findOne(id: number): Promise<Cat> {
    const cat = await this.catRepository.findOne({ where: { id } });
    if (!cat) throw new NotFoundException(`Cat with ID ${id} not found`);
    return cat;
  }

  async findByAgeRange(age_gte: number, age_lte: number): Promise<Cat[]> {
    return await this.catRepository.find({
      where: { age: Between(age_gte, age_lte) },
    });
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = this.catRepository.create(createCatDto);
    return await this.catRepository.save(cat);
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = await this.findOne(id);
    Object.assign(cat, updateCatDto);
    return await this.catRepository.save(cat);
  }

  async remove(id: number): Promise<void> {
    const cat = await this.findOne(id);
    await this.catRepository.remove(cat);
  }
}
