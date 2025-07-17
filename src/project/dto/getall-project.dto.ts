import { ApiProperty } from '@nestjs/swagger';
export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC',
}
export class GetAllProjectsDto {
  @ApiProperty({
    example: '5',
    description: 'Número de Proyectos por pagina',
    type: String,
    required: false,
  })
  take?: string;

  @ApiProperty({
    example: '1',
    description: 'Numero de pagína',
    type: String,
    required: false,
  })
  page?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Nombre del proyecto',
    required: false,
  })
  name?: string;

  @ApiProperty({
    required: false,
    enum: OrderBy,
    description: 'Orden de la información (ASC o DESC)',
  })
  order?: OrderBy;
}
