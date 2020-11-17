import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm'
import {Task} from './Task'
@Entity()
export class Person{
    @PrimaryGeneratedColumn("increment")
    id: number;
    @Column("varchar", {length: 50})
    name: string
    @Column("int")
    age: number
    @OneToOne(()=> Task)
    @JoinColumn()
    taskId: Task;
}