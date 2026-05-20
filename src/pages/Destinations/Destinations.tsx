import React, { useState } from 'react';
import PostCard from '@/features/blog';
import { SectionHeader } from '@/components';
import SEOHead from '@/features/seo';
import { SITE_CONFIG } from '@/constants';
import { useLanguage } from '@/features/i18n';

const Destinations: React.FC = () => {
  const { content } = useLanguage();
  const page = content.pages.destinations;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const selectedCategoryLabel = page.categories.find((category) => category.id === selectedCategory)?.label;

  const filteredPosts = selectedCategory === 'all'
    ? page.posts
    : page.posts.filter(post => post.category === selectedCategoryLabel);

  return (
    <div className="wp-shell">
      <SEOHead 
        title={page.seoTitle}
        description={page.seoDescription}
        keywords={page.seoKeywords}
        url={`${SITE_CONFIG.url}/destinations`}
      />
      <div className="wp-section">
        <div className="wp-container">
          {/* Header */}
          <SectionHeader
            title={page.title}
            subtitle={page.subtitle}
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {page.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`wp-btn ${
                  selectedCategory === category.id
                    ? 'bg-brand-primary text-white dark:bg-brand-primary'
                    : 'bg-white dark:bg-brand-text text-brand-text dark:text-white border border-[var(--color-border)] dark:border-brand-primary hover:bg-brand-background dark:hover:bg-brand-text/90'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-brand-text/75 dark:text-slate-300 text-lg">
                {content.common.noCategoryArticles}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
