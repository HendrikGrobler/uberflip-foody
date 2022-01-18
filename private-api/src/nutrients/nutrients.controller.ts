import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { NutrientsService } from './nutrients.service';
import { CreateNutrientDto } from './dto/create-nutrient.dto';
import { UpdateNutrientDto } from './dto/update-nutrient.dto';

@Controller('nutrients')
export class NutrientsController {
  constructor(private readonly nutrientsService: NutrientsService) {}

  @Post()
  create(@Body() createNutrientDto: CreateNutrientDto) {
    return this.nutrientsService.create(createNutrientDto);
  }

  @Get()
  findAll(
    @Query('search') search: string,
  ) {
    return this.nutrientsService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.nutrientsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateNutrientDto: UpdateNutrientDto,
  ) {
    return this.nutrientsService.update(id, updateNutrientDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    await this.nutrientsService.remove(id);
  }
}
