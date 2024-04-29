import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  try {
    console.log(process.env.RABBIT_MQ_URL);
    const rabbitMq = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_URL],
          queue: 'message_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    );
    const app = await NestFactory.create(AppModule);

    console.log('PORT: ', Number(process?.env?.PORT));
    await rabbitMq.listen();
    await app.listen(Number(process?.env?.PORT));
  } catch (e) {
    console.error(e);
  }
}
bootstrap();
