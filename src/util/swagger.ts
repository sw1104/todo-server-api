import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('TODO SERVICE')
      .setDescription('todo service server api document')
      .setVersion('1.0.0')
      .addTag('swagger')
      .addBearerAuth(
        {
          type: 'http',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'accessToken',
      )
      .build();
  }
}
