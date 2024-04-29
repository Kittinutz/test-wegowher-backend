import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { RabbitmqController } from './rabbitmq/rabbitmq.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBIT_MQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_URL],
          queue: 'message_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
    }),
  ],
  controllers: [AppController, RabbitmqController],
  providers: [AppService, RabbitmqService],
})
export class AppModule { }
