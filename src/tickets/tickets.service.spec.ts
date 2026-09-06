import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.entity';


describe('TicketsService', () => {
    let service : TicketsService;
    let mockRepository : any;

    beforeEach(async () => {
        mockRepository = {
            find : jest.fn(),
            create : jest.fn(),
            save : jest.fn(),
        };

        const module : TestingModule = await Test.createTestingModule({
            providers : [
                TicketsService,
                {
                    provide : getRepositoryToken(Ticket),
                    useValue : mockRepository,
                },
            ],
        }).compile();
        service = module.get<TicketsService>(TicketsService);
    });
    it ('debería estar definido', () => {
        expect(service).toBeDefined();
    });

    it('debería atender el ticket de mayor prioridad', async() => {
        const ticketsFalsos = [
            {id : 1, prioridad : 'media', horaLlegada: new Date('2026-01-01T09:00:00')},
            {id : 2, prioridad : 'alta', horaLlegada: new Date('2026-01-01T09:00:00')},
            {id : 3, prioridad : 'baja', horaLlegada: new Date('2026-01-01T09:00:00')},
        ];

        mockRepository.find.mockResolvedValue(ticketsFalsos);
        mockRepository.save.mockImplementation((ticket) => Promise.resolve(ticket));

        const resultado = await service.atenderSiguiente();

        expect(resultado.id).toBe(2);
    });

    it('debería lanzar un error si la cola está vacía', async() => {
        mockRepository.find.mockResolvedValue([]);

        await expect (service.atenderSiguiente()).rejects.toThrow('La cola está vacía');
    })
});