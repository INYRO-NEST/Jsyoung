// src/entities/user.entity.ts
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @Column('varchar', { unique: true, nullable: false })
    email: string;

    @Column('varchar', { unique: false, nullable: false })
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date | null;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date | null;

    @OneToMany(() => ArticleEntity, (article) => article.user)
    articles: ArticleEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];
}