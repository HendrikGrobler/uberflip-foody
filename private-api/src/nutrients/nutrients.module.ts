import { Module } from '@nestjs/common';
import { NutrientsService } from './nutrients.service';
import { NutrientsController } from './nutrients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutrient } from './entities/nutrient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nutrient])],
  controllers: [NutrientsController],
  providers: [NutrientsService],
})
export class NutrientsModule {}
