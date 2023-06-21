import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class IdDto {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
