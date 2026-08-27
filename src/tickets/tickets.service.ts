import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './create-ticket.dto';

@Injectable()
export class TicketsService{
    constructor(
        @InjectRepository(Ticket)
        private ticketsRepository : Repository <Ticket>
    ) {}

    async crear(dto : CreateTicketDto) : Promise<Ticket> {
        const ticket = this.ticketsRepository.create(dto);
        return this.ticketsRepository.save(ticket);
    }

    async atenderSiguiente() : Promise <Ticket>{
        const pendientes = await this.ticketsRepository.find({where:{atendido : false}});

        if(pendientes.length === 0){
            throw new Error ('La cola esta vacía');
        }

        const prioridades = {alta:1, media:2, baja:3};

        pendientes.sort((a,b) => {const diferenciaPrioridad = prioridades[a.prioridad] - prioridades[b.prioridad];
            if (diferenciaPrioridad !== 0){
                return diferenciaPrioridad;
            }
            return a.horaLlegada.getTime() - b.horaLlegada.getTime();
        });

        const siguiente = pendientes[0];
        siguiente.atendido = true;
        return this.ticketsRepository.save(siguiente);
    }

    async verCola() : Promise <Ticket[]> {
        const pendientes = await this.ticketsRepository.find({where:{atendido:false}});

        if (pendientes.length === 0){
            throw new Error("La cola esta vacía")
        }

        const prioridades = {alta:1, media:2,baja:3}
        pendientes.sort((a,b) => {const diferenciaPrioridad = prioridades[a.prioridad] - prioridades[b.prioridad];
            if (diferenciaPrioridad !== 0){
                return diferenciaPrioridad;
            }
            return a.horaLlegada.getTime() - b.horaLlegada.getTime();
        });
        return pendientes;
    }
}