import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// GraphQL endpoint configuration
const httpLink = createHttpLink({
  uri: import.meta.env.PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
});

// Apollo Client configuration
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

// GraphQL queries for gallery data
export const GET_GALLERIES = `
  query GetGalleries {
    galleries {
      id
      title
      description
      slug
      coverImage {
        id
        url
        alt
        width
        height
      }
      images {
        id
        url
        alt
        caption
        width
        height
        tags
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_GALLERY_BY_SLUG = `
  query GetGalleryBySlug($slug: String!) {
    gallery(slug: $slug) {
      id
      title
      description
      slug
      coverImage {
        id
        url
        alt
        width
        height
      }
      images {
        id
        url
        alt
        caption
        width
        height
        tags
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_IMAGES = `
  query GetImages($limit: Int, $offset: Int, $tags: [String]) {
    images(limit: $limit, offset: $offset, tags: $tags) {
      id
      url
      alt
      caption
      width
      height
      tags
      createdAt
    }
  }
`;

// Types for GraphQL responses
export interface Image {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  tags?: string[];
  createdAt: string;
}

export interface Gallery {
  id: string;
  title: string;
  description?: string;
  slug: string;
  coverImage: Image;
  images: Image[];
  createdAt: string;
  updatedAt: string;
}

export interface GalleriesResponse {
  galleries: Gallery[];
}

export interface GalleryResponse {
  gallery: Gallery;
}

export interface ImagesResponse {
  images: Image[];
}
