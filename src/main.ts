import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './user/auth/auth.guard';
import { BaseAPIDocument } from './util/swagger';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new AuthGuard());

  const config = new BaseAPIDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
  });

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      persistAuthorization: true,
    },
  });

  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log(`🚀 Listening on Port ${PORT} 🚀`);
  });
}
bootstrap();
