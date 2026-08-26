import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    descripcion : string;

    @Column()
    prioridad : string;

    @Column()
    canal : string;

    @CreateDateColumn()
    horaLlegada : Date;

    @Column({ default: false})
    atendido : boolean
}