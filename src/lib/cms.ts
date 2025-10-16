// CMS integration for content management
// This can be adapted for various headless CMS providers like Strapi, Contentful, Sanity, etc.

export interface CMSConfig {
  apiUrl: string;
  apiKey?: string;
  spaceId?: string;
  environment?: string;
}

export class CMSService {
  private config: CMSConfig;

  constructor(config: CMSConfig) {
    this.config = config;
  }

  // Generic fetch method with error handling
  private async fetchData<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.config.apiUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.config.apiKey) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`CMS API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('CMS fetch error:', error);
      throw error;
    }
  }

  // Fetch galleries from CMS
  async getGalleries(): Promise<any[]> {
    try {
      const data = await this.fetchData<any>('/galleries?populate=*');
      return data.data || [];
    } catch (error) {
      console.error('Error fetching galleries:', error);
      return [];
    }
  }

  // Fetch a specific gallery by slug
  async getGalleryBySlug(slug: string): Promise<any | null> {
    try {
      const data = await this.fetchData<any>(`/galleries?filters[slug][$eq]=${slug}&populate=*`);
      return data.data?.[0] || null;
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return null;
    }
  }

  // Fetch images with optional filtering
  async getImages(filters?: {
    limit?: number;
    offset?: number;
    tags?: string[];
  }): Promise<any[]> {
    try {
      let endpoint = '/images?populate=*';
      
      if (filters?.limit) {
        endpoint += `&pagination[limit]=${filters.limit}`;
      }
      
      if (filters?.offset) {
        endpoint += `&pagination[offset]=${filters.offset}`;
      }
      
      if (filters?.tags?.length) {
        const tagFilter = filters.tags.map(tag => `filters[tags][$contains]=${tag}`).join('&');
        endpoint += `&${tagFilter}`;
      }

      const data = await this.fetchData<any>(endpoint);
      return data.data || [];
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  }

  // Upload image to CMS (for admin functionality)
  async uploadImage(file: File, metadata?: {
    alt?: string;
    caption?: string;
    tags?: string[];
  }): Promise<any> {
    const formData = new FormData();
    formData.append('files', file);
    
    if (metadata) {
      formData.append('data', JSON.stringify({
        alt: metadata.alt || '',
        caption: metadata.caption || '',
        tags: metadata.tags || [],
      }));
    }

    try {
      const response = await fetch(`${this.config.apiUrl}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
}

// Default CMS configuration
export const cmsConfig: CMSConfig = {
  apiUrl: import.meta.env.PUBLIC_CMS_API_URL || 'http://localhost:1337/api',
  apiKey: import.meta.env.PUBLIC_CMS_API_KEY,
  spaceId: import.meta.env.PUBLIC_CMS_SPACE_ID,
  environment: import.meta.env.PUBLIC_CMS_ENVIRONMENT || 'development',
};

// Create CMS service instance
export const cmsService = new CMSService(cmsConfig);

// Mock data for development when CMS is not available
export const mockGalleries = [
  {
    id: '1',
    title: 'Nature Photography',
    description: 'A collection of stunning nature photographs capturing the beauty of the natural world.',
    slug: 'nature-photography',
    coverImage: {
      id: '1',
      url: 'https://picsum.photos/800/600?random=1',
      alt: 'Beautiful mountain landscape at sunset',
      width: 800,
      height: 600,
    },
    images: [
      {
        id: '1',
        url: 'https://picsum.photos/800/600?random=1',
        alt: 'Beautiful mountain landscape at sunset',
        caption: 'Golden hour in the mountains',
        width: 800,
        height: 600,
        tags: ['nature', 'mountains', 'sunset'],
        createdAt: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        url: 'https://picsum.photos/800/600?random=2',
        alt: 'Forest path with sunlight filtering through trees',
        caption: 'Peaceful forest walk',
        width: 800,
        height: 600,
        tags: ['nature', 'forest', 'trees'],
        createdAt: '2024-01-16T10:00:00Z',
      },
      {
        id: '3',
        url: 'https://picsum.photos/800/600?random=3',
        alt: 'Ocean waves crashing on rocky shore',
        caption: 'Powerful ocean waves',
        width: 800,
        height: 600,
        tags: ['nature', 'ocean', 'waves'],
        createdAt: '2024-01-17T10:00:00Z',
      },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
  },
  {
    id: '2',
    title: 'Urban Architecture',
    description: 'Modern and classic architecture captured in urban environments.',
    slug: 'urban-architecture',
    coverImage: {
      id: '4',
      url: 'https://picsum.photos/800/600?random=4',
      alt: 'Modern skyscraper against blue sky',
      width: 800,
      height: 600,
    },
    images: [
      {
        id: '4',
        url: 'https://picsum.photos/800/600?random=4',
        alt: 'Modern skyscraper against blue sky',
        caption: 'Glass and steel reaching for the sky',
        width: 800,
        height: 600,
        tags: ['architecture', 'urban', 'modern'],
        createdAt: '2024-01-18T10:00:00Z',
      },
      {
        id: '5',
        url: 'https://picsum.photos/800/600?random=5',
        alt: 'Historic building facade with ornate details',
        caption: 'Classical architecture details',
        width: 800,
        height: 600,
        tags: ['architecture', 'historic', 'classical'],
        createdAt: '2024-01-19T10:00:00Z',
      },
    ],
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
  },
  {
    id: '3',
    title: 'Portrait Photography',
    description: 'Intimate and expressive portrait photography.',
    slug: 'portrait-photography',
    coverImage: {
      id: '6',
      url: 'https://picsum.photos/600/800?random=6',
      alt: 'Professional portrait of a woman',
      width: 600,
      height: 800,
    },
    images: [
      {
        id: '6',
        url: 'https://picsum.photos/600/800?random=6',
        alt: 'Professional portrait of a woman',
        caption: 'Natural light portrait session',
        width: 600,
        height: 800,
        tags: ['portrait', 'professional', 'natural-light'],
        createdAt: '2024-01-20T10:00:00Z',
      },
      {
        id: '7',
        url: 'https://picsum.photos/600/800?random=7',
        alt: 'Candid portrait of a man laughing',
        caption: 'Capturing genuine emotion',
        width: 600,
        height: 800,
        tags: ['portrait', 'candid', 'emotion'],
        createdAt: '2024-01-21T10:00:00Z',
      },
    ],
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-21T10:00:00Z',
  },
];
