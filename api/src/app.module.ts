import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ValidacionRutModule } from './validacion-rut/validacion-rut.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log({
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
        });

        return {
          type: 'mysql',
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
          logger: 'advanced-console',
          logging: 'all',
        };
      },
      inject: [ConfigService],
    }),
    ValidacionRutModule,
  ],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
