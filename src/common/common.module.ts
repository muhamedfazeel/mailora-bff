import { Module } from '@nestjs/common';
import { CustomLoggerModule } from './logger/custom-logger.module';
import { HttpRestModule } from 'src/http-rest/http-rest.module';

const commonModules = [CustomLoggerModule, HttpRestModule];

@Module({
  imports: commonModules,
  exports: commonModules,
})
export class CommonModule {}
