import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { GeneralExceptionFilter } from './general-exceptions/general-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // applying global validation pipe to validate incoming requests
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // initializing the documentation

  const config = new DocumentBuilder()
    .setTitle('ENNOV Test backend Documentation')
    .setDescription('ENNOV ->Routes and explanations')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalFilters(new GeneralExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
