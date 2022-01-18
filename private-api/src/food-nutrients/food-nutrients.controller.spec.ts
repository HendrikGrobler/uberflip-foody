import { Test, TestingModule } from '@nestjs/testing';
import { FoodNutrientsController } from './food-nutrients.controller';
import { FoodNutrientsService } from './food-nutrients.service';

describe('FoodNutrientsController', () => {
  let controller: FoodNutrientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodNutrientsController],
      providers: [FoodNutrientsService],
    }).compile();

    controller = module.get<FoodNutrientsController>(FoodNutrientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
