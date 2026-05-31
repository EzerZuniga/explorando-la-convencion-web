"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/features/i18n";
import { formatDate } from "@/utils";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { content, locale } = useLanguage();

  return (
    <article
      className="group wp-card wp-card-interactive h-full flex flex-col overflow-hidden hover:border-brand-primary "
      role="article"
      aria-label={`${content.common.article}: ${post.title}`}
    >
      <Link
        href={`/post/${post.id}`}
        className="relative h-52 overflow-hidden bg-brand-primary/20  block"
        aria-label={`${content.common.readArticle}: ${post.title}`}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <Link href={`/post/${post.id}`} className="group/title">
          <h3 className="font-heading text-xl font-bold text-brand-text  mb-2 line-clamp-2 leading-snug group-hover/title:text-brand-primary  transition-colors duration-300">
            {post.title}
          </h3>
        </Link>

        <p className="text-brand-text/75  text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
          {post.excerpt}
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-brand-primary/20  to-transparent mb-4" />

        <div className="space-y-2.5">
          <div className="flex items-center text-sm text-brand-text/90 ">
            <div className="flex items-center justify-center w-7 h-7 rounded-none bg-brand-primary/10  mr-2.5">
              <User
                size={14}
                strokeWidth={1.75}
                className="text-brand-primary"
              />
            </div>
            <span className="font-medium">{post.author}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-brand-text/60 ">
            <div className="flex items-center gap-1.5">
              <Calendar
                size={13}
                strokeWidth={1.75}
                className="text-brand-text/45 "
              />
              <span>{formatDate(post.date, locale)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-brand-background  px-2.5 py-1 rounded-none">
              <Clock
                size={13}
                strokeWidth={1.75}
                className="text-brand-text/45 "
              />
              <span className="font-medium">{post.readTime}</span>
            </div>
          </div>
        </div>

        <Link
          href={`/post/${post.id}`}
          className="mt-4 w-full wp-btn-secondary group/btn"
          aria-label={`${content.common.readArticle}: ${post.title}`}
        >
          <span>{content.common.readArticle}</span>
          <ArrowRight
            size={18}
            strokeWidth={1.75}
            className="transform group-hover/btn:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
