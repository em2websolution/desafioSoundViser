import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const config = new DocumentBuilder()
  .setTitle('Bank example')
  .setDescription('The Bank API description')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config, options);
SwaggerModule.setup('api', app, document);
  await app.listen(4000);
}
bootstrap();
