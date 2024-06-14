import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rut {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cuerpo: string;

  @Column()
  digitoVerificador: string;

  @Column()
  valido: boolean;
}
