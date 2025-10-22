import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ITask, TaskState } from "./interfaces/task.interface";

@Entity("tasks")
export class Task implements ITask {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "enum", enum: TaskState, default: TaskState.PENDING })
  state!: TaskState;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
