import { Inject, Injectable } from '@nestjs/common';
import { UpdateRabbitmqDto } from './dto/update-rabbitmq.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  constructor(@Inject('RABBIT_MQ_SERVICE') private client: ClientProxy) { }

  // constructor(@Inject('RABBIT_MQ_SERVICE') private client: ClientProxy) { }
  async create(to: string, message: string) {
    try {
      await this.client.send(to, message);
    } catch (e) {
      console.error(e);
    }
  }

  findAll() {
    return `This action returns all rabbitmq`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rabbitmq`;
  }

  update(id: number, updateRabbitmqDto: UpdateRabbitmqDto) {
    return `This action updates a #${id} rabbitmq`;
  }

  remove(id: number) {
    return `This action removes a #${id} rabbitmq`;
  }
}
