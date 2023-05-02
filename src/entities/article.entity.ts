// src/entities/article.entity.ts
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';

@Entity('Article')
export class ArticleEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @Column('varchar', { unique: false, nullable: false })
    title: string;

    @Column('text', { unique: false, nullable: false })
    content: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date | null;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date | null;

    @Column('bigint', { unique: false, nullable: false })
    userId: string;

    @ManyToOne(() => UserEntity, (user) => user.articles)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: UserEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.article)
    comments: CommentEntity[];
}