/**
 * Section Registry - Dynamic component registration system
 * Allows automatic discovery and rendering of atomic sections
 */

import { ComponentType } from 'react';
import type { BaseSection } from '@/types';

interface SectionComponent {
  component: ComponentType<{ section: BaseSection }>;
  displayName: string;
  category?: 'hero' | 'content' | 'social-proof' | 'conversion' | 'layout' | 'other';
  description?: string;
}

class SectionRegistry {
  private registry = new Map<string, SectionComponent>();

  /**
   * Register a new section component
   */
  register(
    type: string,
    component: ComponentType<{ section: BaseSection }>,
    options: {
      displayName: string;
      category?: SectionComponent['category'];
      description?: string;
    }
  ) {
    this.registry.set(type, {
      component,
      displayName: options.displayName,
      category: options.category,
      description: options.description,
    });
  }

  /**
   * Get a component by type
   */
  get(type: string): ComponentType<{ section: BaseSection }> | null {
    const entry = this.registry.get(type);
    return entry ? entry.component : null;
  }

  /**
   * Check if a section type exists
   */
  has(type: string): boolean {
    return this.registry.has(type);
  }

  /**
   * Get all registered section types
   */
  getAllTypes(): string[] {
    return Array.from(this.registry.keys());
  }

  /**
   * Get sections by category
   */
  getByCategory(category: SectionComponent['category']): Map<string, SectionComponent> {
    const filtered = new Map<string, SectionComponent>();
    this.registry.forEach((value, key) => {
      if (value.category === category) {
        filtered.set(key, value);
      }
    });
    return filtered;
  }

  /**
   * Get all section metadata
   */
  getAllMetadata(): Array<{
    type: string;
    displayName: string;
    category?: string;
    description?: string;
  }> {
    return Array.from(this.registry.entries()).map(([type, data]) => ({
      type,
      displayName: data.displayName,
      category: data.category,
      description: data.description,
    }));
  }

  /**
   * Clear all registrations (useful for testing)
   */
  clear() {
    this.registry.clear();
  }
}

// Export singleton instance
export const sectionRegistry = new SectionRegistry();

// Export function to register components
export function registerSection(
  type: string,
  component: ComponentType<{ section: BaseSection }>,
  options: {
    displayName: string;
    category?: SectionComponent['category'];
    description?: string;
  }
) {
  sectionRegistry.register(type, component, options);
}
