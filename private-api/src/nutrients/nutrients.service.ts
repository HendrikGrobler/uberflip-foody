import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateNutrientDto } from './dto/create-nutrient.dto';
import { UpdateNutrientDto } from './dto/update-nutrient.dto';
import { Nutrient } from './entities/nutrient.entity';

@Injectable()
export class NutrientsService {
  constructor(
    @InjectRepository(Nutrient)
    private nutrientsRepository: Repository<Nutrient>,
  ) {}

  create(createNutrientDto: CreateNutrientDto) {
    return 'This action adds a new nutrient';
  }

  findAll(search = '') {
    const where = {};
    if (search) {
      where['name'] = Like(`%${search}%`)
    }
    return this.nutrientsRepository.find({
      where,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} nutrient`;
  }

  update(id: number, updateNutrientDto: UpdateNutrientDto) {
    return `This action updates a #${id} nutrient`;
  }

  remove(id: number) {
    return `This action removes a #${id} nutrient`;
  }
}
