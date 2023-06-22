import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  startServer(@Res() res) {
    return res.status(HttpStatus.OK).send('EMS server is up!');
  }
}
