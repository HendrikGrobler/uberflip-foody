import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { AddFoodNutrientDto } from './dto/add-food-nutrient.dto';
import { FoodNutrientsService } from './food-nutrients.service';

@Controller('foods/:foodId/nutrients')
export class FoodNutrientsController {
  constructor(private readonly foodNutrientsService: FoodNutrientsService) {}

  @Get()
  findAll(
    @Param('foodId') foodId: number,
  ) {
    return this.foodNutrientsService.findNutrients(foodId);
  }

  @Put(':nutrientId')
  async addFood(
    @Param('foodId') foodId: number,
    @Param('nutrientId') nutrientId: number,
    @Body() addFoodNutrientDto: AddFoodNutrientDto,
  ) {
    await this.foodNutrientsService.addNutrient(foodId, nutrientId, addFoodNutrientDto);
  }

  @Get(':nutrientId')
  food(@Param('foodId') foodId: number, @Param('nutrientId') nutrientId: number) {
    return this.foodNutrientsService.findNutrient(foodId, nutrientId);
  }

  @Delete(':nutrientId')
  @HttpCode(204)
  async deleteFood(
    @Param('foodId') foodId: number,
    @Param('nutrientId') nutrientId: number,
  ) {
    await this.foodNutrientsService.deleteNutrient(foodId, nutrientId);
  }

}
