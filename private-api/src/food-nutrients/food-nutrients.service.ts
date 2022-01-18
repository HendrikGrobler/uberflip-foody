import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddFoodNutrientDto } from './dto/add-food-nutrient.dto';
import { FoodNutrient } from './entities/food-nutrient.entity';

@Injectable()
export class FoodNutrientsService {
  constructor(
    @InjectRepository(FoodNutrient)
    private foodNutrientsRepository: Repository<FoodNutrient>,
  ) {}

  findNutrients(foodId: number) {
    return this.foodNutrientsRepository.find({
      relations: ['nutrient'],
      where: { foodId }
    });
  }

  findNutrient(foodId: number, nutrientId: number) {
    return this.foodNutrientsRepository.findOne({
      relations: ['nutrient'],
      where: { foodId, nutrientId },
    });
  }

  deleteNutrient(foodId: number, nutrientId: number) {
    return this.foodNutrientsRepository.delete({
      foodId,
      nutrientId,
    });
  }

  addNutrient(foodId: number, nutrientId: number, addFoodNutrientDto: AddFoodNutrientDto) {
    return this.foodNutrientsRepository.insert({
      foodId,
      nutrientId,
      ...addFoodNutrientDto,
    });
  }

}
