import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FoodsModule } from './foods/foods.module';
import { NutrientsModule } from './nutrients/nutrients.module';
import { UserFoodsModule } from './user-foods/user-foods.module';
import { FoodNutrientsModule } from './food-nutrients/food-nutrients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    UserFoodsModule,
    FoodsModule,
    NutrientsModule,
    FoodNutrientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
