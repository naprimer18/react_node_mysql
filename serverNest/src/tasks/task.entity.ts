import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field,  ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Task {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @Column({ length: 50 })
  name: string;
}


