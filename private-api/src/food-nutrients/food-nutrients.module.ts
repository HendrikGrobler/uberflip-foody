import { Module } from '@nestjs/common';
import { FoodNutrientsService } from './food-nutrients.service';
import { FoodNutrientsController } from './food-nutrients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodNutrient } from './entities/food-nutrient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodNutrient])],
  controllers: [FoodNutrientsController],
  providers: [FoodNutrientsService]
})
export class FoodNutrientsModule {}
