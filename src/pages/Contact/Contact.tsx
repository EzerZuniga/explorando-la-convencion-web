import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import SEOHead from '@/features/seo';
import { EMAIL_REGEX, SITE_CONFIG } from '@/constants';
import { SectionHeader } from '@/components';
import { useLanguage } from '@/features/i18n';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const INITIAL_FORM: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const validateForm = (
  values: ContactFormData,
  messages: {
    name: string;
    email: string;
    subject: string;
    message: string;
  },
): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = messages.name;
  }

  if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = messages.email;
  }

  if (!values.subject) {
    errors.subject = messages.subject;
  }

  if (values.message.trim().length < 20) {
    errors.message = messages.message;
  }

  return errors;
};

const Contact: React.FC = () => {
  const { content } = useLanguage();
  const page = content.pages.contact;
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    if (submitMessage) {
      setSubmitMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedData: ContactFormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject,
      message: formData.message.trim(),
    };

    const nextErrors = validateForm(normalizedData, page.validation);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitMessage({
        type: 'error',
        text: page.validation.review,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitMessage(null);

      // Simulación del envío en espera de integración con backend real
      await new Promise((resolve) => setTimeout(resolve, 700));

      setFormData(INITIAL_FORM);
      setErrors({});
      setSubmitMessage({
        type: 'success',
        text: page.validation.success,
      });
    } catch {
      setSubmitMessage({
        type: 'error',
        text: page.validation.failure,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wp-shell">
      <SEOHead 
        title={page.seoTitle}
        description={page.seoDescription}
        keywords={page.seoKeywords}
        url={`${SITE_CONFIG.url}/contact`}
      />
      <div className="wp-section">
        <div className="wp-container">
          {/* Header */}
          <SectionHeader
            title={page.title}
            subtitle={page.subtitle}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="wp-card p-8 border-l-4 border-brand-primary">
                <h2 className="font-heading text-3xl font-bold text-brand-text dark:text-white mb-6 tracking-tight">
                  {page.infoTitle}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="w-5 h-5 text-brand-primary dark:text-brand-primary/70" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-text dark:text-white">Email</h3>
                      <p className="text-brand-text/75 dark:text-slate-300">{SITE_CONFIG.contact.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="w-5 h-5 text-brand-primary dark:text-brand-primary/70" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-text dark:text-white">{page.labels.phone}</h3>
                      <p className="text-brand-text/75 dark:text-slate-300">{SITE_CONFIG.contact.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-brand-primary dark:text-brand-primary/70" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-text dark:text-white">{page.labels.office}</h3>
                      <p className="text-brand-text/75 dark:text-slate-300">{SITE_CONFIG.contact.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Globe className="w-5 h-5 text-brand-primary dark:text-brand-primary/70" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-text dark:text-white">{page.labels.social}</h3>
                      <div className="flex space-x-4 mt-2">
                        <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="wp-link" aria-label={page.socialLabels.facebook}>
                          Facebook
                        </a>
                        <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="wp-link" aria-label={page.socialLabels.instagram}>
                          Instagram
                        </a>
                        <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" className="wp-link" aria-label={page.socialLabels.youtube}>
                          YouTube
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="wp-card p-8 border-t-4 border-brand-primary">
                <h2 className="font-heading text-3xl font-bold text-brand-text dark:text-white mb-6">
                  {page.formTitle}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <p className="text-sm text-brand-text/75 dark:text-slate-300">
                    {page.requiredNote.split('*')[0]}<span className="text-brand-primary">*</span>{page.requiredNote.split('*').slice(1).join('*')}
                  </p>

                  <div className="min-h-[1.75rem]" aria-live="polite">
                    {submitMessage && (
                      <p
                        className={`text-sm font-medium ${
                          submitMessage.type === 'success'
                            ? 'text-brand-primary dark:text-brand-primary/70'
                            : 'text-red-700 dark:text-red-400'
                        }`}
                        role={submitMessage.type === 'error' ? 'alert' : undefined}
                      >
                        {submitMessage.text}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brand-text dark:text-white mb-2">
                        {page.labels.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        className={`wp-input ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-300' : ''}`}
                        placeholder={page.placeholders.name}
                        maxLength={80}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-2 text-sm text-red-700 dark:text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brand-text dark:text-white mb-2">
                        {page.labels.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className={`wp-input ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-300' : ''}`}
                        placeholder={page.placeholders.email}
                        maxLength={120}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-2 text-sm text-red-700 dark:text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-brand-text dark:text-white mb-2">
                      {page.labels.subject}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`wp-select ${errors.subject ? 'border-red-400 focus:border-red-500 focus:ring-red-300' : ''}`}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    >
                      <option value="">{page.placeholders.subject}</option>
                      {page.subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>{subject.label}</option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p id="subject-error" className="mt-2 text-sm text-red-700 dark:text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-text dark:text-white mb-2">
                      {page.labels.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={`wp-textarea ${errors.message ? 'border-red-400 focus:border-red-500 focus:ring-red-300' : ''}`}
                      placeholder={page.placeholders.message}
                      maxLength={1200}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : 'message-help'}
                    />
                    <div className="mt-2 flex items-center justify-between gap-3">
                      {errors.message ? (
                        <p id="message-error" className="text-sm text-red-700 dark:text-red-400">
                          {errors.message}
                        </p>
                      ) : (
                        <p id="message-help" className="text-xs text-brand-text/60 dark:text-slate-400">
                          {page.helper}
                        </p>
                      )}
                      <p className="text-xs text-brand-text/60 dark:text-slate-400">
                        {formData.message.length}/1200
                      </p>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="wp-btn-primary w-full md:w-auto"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? page.submitting : page.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
