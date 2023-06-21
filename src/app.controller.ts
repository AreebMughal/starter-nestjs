import { Controller, Get, HttpCode, HttpStatus, Res, UseInterceptors } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  startServer(@Res() res) {
    return res.status(HttpStatus.OK).send('EMS server is up!');
  }
}
