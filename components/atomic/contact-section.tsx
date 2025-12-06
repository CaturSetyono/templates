'use client';

import type { BaseSection } from '@/types';
import { safeGet, safeArray, hasContent, safeString } from '@/lib/safe-access';
import { cn } from '@/lib/cn';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactSectionProps {
  section: BaseSection;
}

/**
 * Contact Section - Contact form and information
 * Supports: form, contact info, map
 */
export function ContactSection({ section }: ContactSectionProps) {
  const props = section?.props || {};

  const title = safeString(props.title);
  const description = safeString(props.description);
  const email = safeString(props.email);
  const phone = safeString(props.phone);
  const address = safeString(props.address);
  const showForm = hasContent(props.form) || hasContent(props.showForm);
  const formAction = safeString(props.formAction, '#');

  // Early return if no content
  if (!hasContent(title) && !hasContent(email) && !hasContent(phone) && !showForm) {
    return null;
  }

  return (
    <section id={section.id} className="relative py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(hasContent(title) || hasContent(description)) && (
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            {hasContent(title) && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">{title}</h2>
            )}
            {hasContent(description) && <p className="text-lg text-gray-600">{description}</p>}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              {hasContent(email) && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${email}`}
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              )}

              {hasContent(phone) && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a
                      href={`tel:${phone}`}
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              {hasContent(address) && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form action={formAction} method="POST" className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
