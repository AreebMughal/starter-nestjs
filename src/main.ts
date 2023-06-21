import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './intercepter/response.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']
  });

  const options = new DocumentBuilder()
    .setTitle('Event Management System - EMS')
    .setDescription('The Event Management System - EMS API description')
    .setVersion('1.0')
    .addTag('Event Management System')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(process.env.PORT || 5000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
