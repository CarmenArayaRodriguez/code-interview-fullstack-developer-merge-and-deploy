import { Controller, Post } from '@nestjs/common';

@Controller('/api/validation')
export class ValidacionRutController {
  @Post()
  create(): string {
    return 'el rut es valido';
  }
}
