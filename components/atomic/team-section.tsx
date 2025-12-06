'use client';

import type { BaseSection } from '@/types';
import { cn } from '@/lib/cn';
import { safeString, safeArray, hasContent } from '@/lib/safe-access';

interface TeamSectionProps {
  section: BaseSection;
}

export function TeamSection({ section }: TeamSectionProps) {
  const props = section?.props || {};

  const members = safeArray(props.members);

  if (members.length === 0) {
    return null;
  }

  const columns = props.columns || 3;

  return (
    <section id={section.id} className="section-container bg-gray-50">
      <div className="content-container">
        {(hasContent(props.title) || hasContent(props.subtitle)) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {hasContent(props.title) && (
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{safeString(props.title)}</h2>
            )}
            {hasContent(props.subtitle) && (
              <p className="text-xl text-gray-600">{safeString(props.subtitle)}</p>
            )}
          </div>
        )}

        <div
          className={cn(
            'grid gap-8',
            columns === 2 && 'md:grid-cols-2',
            columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
            columns === 4 && 'md:grid-cols-2 lg:grid-cols-4'
          )}
        >
          {members
            .filter((member) => hasContent(member.name))
            .map((member, idx) => (
              <div
                key={member.id}
                className="card p-8 text-center group hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {member.image && (
                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover ring-4 ring-gray-100 group-hover:ring-primary transition-all duration-300"
                    />
                    {member.social && (
                      <div className="absolute inset-0 bg-primary/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        {member.social.map((link: any, socialIdx: number) => (
                          <a
                            key={socialIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:scale-125 transition-transform"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.430.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{member.name}</h3>
                {member.role && <p className="text-primary font-semibold mb-3">{member.role}</p>}
                {member.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
