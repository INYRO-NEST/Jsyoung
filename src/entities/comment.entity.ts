// src/entities/comment.entity.ts
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ArticleEntity } from './article.entity';

@Entity('Comment')
export class CommentEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @Column('text', { unique: false, nullable: false })
    content: string;

    @Column('bigint', { unique: false, nullable: true })
    parentId: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date | null;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date | null;

    @Column('bigint', { unique: false, nullable: false })
    userId: string;

    @Column('bigint', { unique: false, nullable: false })
    articleId: string;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: UserEntity;

    @ManyToOne(() => ArticleEntity, (article) => article.comments)
    @JoinColumn({ name: 'articleId', referencedColumnName: 'id' })
    article: ArticleEntity;
}