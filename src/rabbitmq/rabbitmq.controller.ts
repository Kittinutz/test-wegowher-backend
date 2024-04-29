import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';
import { CreateRabbitmqDto } from './dto/create-rabbitmq.dto';
import { UpdateRabbitmqDto } from './dto/update-rabbitmq.dto';

@Controller()
export class RabbitmqController {
  constructor(private readonly rabbitmqService: RabbitmqService) { }

  @MessagePattern(process.env.FOLLOW_MESSAGE)
  create(
    @Payload() createRabbitmqDto: CreateRabbitmqDto,
    @Ctx() context: RmqContext,
  ) {
    console.log('Received Message ', createRabbitmqDto);
  }
}
