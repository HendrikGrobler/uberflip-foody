import { Test, TestingModule } from '@nestjs/testing';
import { FoodNutrientsService } from './food-nutrients.service';

describe('FoodNutrientsService', () => {
  let service: FoodNutrientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodNutrientsService],
    }).compile();

    service = module.get<FoodNutrientsService>(FoodNutrientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
