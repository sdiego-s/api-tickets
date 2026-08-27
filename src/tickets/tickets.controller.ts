import {Controller, Get, Post, Body } from '@nestjs/common'
import { TicketsService } from './tickets.service'
import { CreateTicketDto } from './create-ticket.dto'

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService : TicketsService) {}

    @Post()
    crear(@Body() dto:CreateTicketDto) {
        return this.ticketsService.crear(dto);
    }

    @Get()
    verCola() {
        return this.ticketsService.verCola();
    }

    @Post('atender')
    atenderSiguiente() {
        return this.ticketsService.atenderSiguiente();
    }
}