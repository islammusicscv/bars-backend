import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import { UserModule } from './user/user.module';
import {User} from "./user/user.entity";
import { LocationsModule } from './locations/locations.module';
import {LocationEntity} from "./locations/location.entity";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true}),
      TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'bars',
    entities: [User, LocationEntity],
    synchronize: true,
  }),
      UserModule,
      LocationsModule,
      AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
