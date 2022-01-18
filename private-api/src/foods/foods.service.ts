import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food } from './entities/food.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private foodsRepository: Repository<Food>,
  ) {}

  create(createFoodDto: CreateFoodDto) {
    return this.foodsRepository.save(createFoodDto);
  }

  findAll(search = '', skip = 0, take = 15) {
    const where = {};
    if (search) {
      where['description'] = Like(`%${search}%`)
    }
    return this.foodsRepository.find({
      where,
      skip,
      take,
    });
  }

  findOne(id: number) {
    return this.foodsRepository.findOneOrFail(id);
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    await this.foodsRepository.update({ id }, updateFoodDto);
    return this.foodsRepository.findOneOrFail(id);
  }

  remove(id: number) {
    return this.foodsRepository.delete({ id });
  }
}
