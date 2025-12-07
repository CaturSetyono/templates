/**
 * Config Loader Utility
 * 
 * Centralized utility for loading configuration files.
 * Supports both YAML and JSON formats with automatic fallback.
 * 
 * Priority:
 * 1. config.yaml (if exists)
 * 2. config.json (fallback)
 */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface ConfigFile {
    path: string;
    format: 'yaml' | 'json';
    exists: boolean;
    mtime?: number;
}

/**
 * Find which config file exists
 * Returns info about the config file (YAML takes precedence)
 */
export function findConfigFile(): ConfigFile | null {
    const configDir = path.join(process.cwd(), 'config');

    // Check for YAML first (priority)
    const yamlPath = path.join(configDir, 'config.yaml');
    if (fs.existsSync(yamlPath)) {
        return {
            path: yamlPath,
            format: 'yaml',
            exists: true,
            mtime: fs.statSync(yamlPath).mtimeMs,
        };
    }

    // Fallback to JSON
    const jsonPath = path.join(configDir, 'config.json');
    if (fs.existsSync(jsonPath)) {
        return {
            path: jsonPath,
            format: 'json',
            exists: true,
            mtime: fs.statSync(jsonPath).mtimeMs,
        };
    }

    return null;
}

/**
 * Load configuration from YAML or JSON file
 * Returns parsed config object or null if not found
 */
export function loadConfig<T = any>(): T | null {
    const configFile = findConfigFile();

    if (!configFile) {
        console.warn('No config file found (checked config.yaml and config.json)');
        return null;
    }

    try {
        const fileContents = fs.readFileSync(configFile.path, 'utf8');

        if (configFile.format === 'yaml') {
            const config = yaml.load(fileContents) as T;
            console.log(`✓ Config loaded from YAML: ${configFile.path}`);
            return config;
        } else {
            const config = JSON.parse(fileContents) as T;
            console.log(`✓ Config loaded from JSON: ${configFile.path}`);
            return config;
        }
    } catch (error) {
        console.error(`Failed to load config from ${configFile.path}:`, error);
        return null;
    }
}

/**
 * Check if config file exists
 * Returns existence status and modification time
 */
export function checkConfigExists(): { exists: boolean; mtime: number; format?: 'yaml' | 'json' } {
    const configFile = findConfigFile();

    if (!configFile) {
        return { exists: false, mtime: 0 };
    }

    return {
        exists: true,
        mtime: configFile.mtime || 0,
        format: configFile.format,
    };
}

/**
 * Load config and extract site configuration
 */
export function loadSiteConfig(): any | null {
    const config = loadConfig();
    return config ? (config as any).site : null;
}

/**
 * Load config and find page by slug
 */
export function loadPageConfig(slug: string): any | null {
    const config = loadConfig();
    if (!config) return null;

    const configData = config as any;

    // Support pages array structure
    if (configData.pages && Array.isArray(configData.pages)) {
        const page = configData.pages.find((p: any) => p.slug === slug);
        return page || null;
    }

    // Support direct sections structure (for home page)
    if (configData.sections && slug === '/') {
        return {
            slug: '/',
            title: 'Home',
            description: configData.site?.description || '',
            sections: configData.sections,
        };
    }

    return null;
}
