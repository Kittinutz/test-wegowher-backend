import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqController } from './rabbitmq.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  ],
  controllers: [RabbitmqController],
  providers: [RabbitmqService],
})
export class RabbitmqModule { }
