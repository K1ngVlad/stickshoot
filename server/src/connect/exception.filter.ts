import { Catch, ArgumentsHost } from '@nestjs/common';
import { Socket } from 'socket.io';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch()
export class ExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const client: Socket = host.switchToWs().getClient();

    console.log(exception.message);

    switch (exception.message) {
      case 'The player is already connected to this lobby':
        client.emit('already-connected');
        break;
      case 'This lobby does not exist':
        client.emit('lobby-does-not-exist');
        break;
      default:
        client.emit('error', exception.message);
    }

    super.catch(exception, host);
  }
}
