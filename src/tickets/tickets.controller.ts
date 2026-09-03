import {Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { TicketsService } from './tickets.service'
import { CreateTicketDto } from './create-ticket.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService : TicketsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    crear(@Body() dto:CreateTicketDto) {
        return this.ticketsService.crear(dto);
    }

    @Get()
    verCola() {
        return this.ticketsService.verCola();
    }

    @UseGuards(JwtAuthGuard)
    @Post('atender')
    atenderSiguiente() {
        return this.ticketsService.atenderSiguiente();
    }
}