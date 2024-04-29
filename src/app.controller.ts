import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitMQ: RabbitmqService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  forwardMessage(@Body() body: { to: string; message: string }) {
    const { to = '', message = '' } = body;
    this.rabbitMQ.create(to, message);
  }
}
