import { IsNotEmpty, IsString, IsIn } from 'class-validator'

export class CreateTicketDto{
    @IsString()
    @IsNotEmpty()
    descripcion : string;

    @IsIn(['alta','media','baja'])
    @IsNotEmpty()
    @IsString()
    prioridad : string;

    @IsIn(['presencial', 'telefono', 'internet'])
    @IsNotEmpty()
    @IsString()
    canal : string;
}