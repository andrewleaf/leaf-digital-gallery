# Leaf Digital Gallery

A modern photography and art gallery application built with Astro and GraphQL. Perfect for showcasing photography portfolios, art collections, and visual content with a beautiful, responsive design.

## ✨ Features

- **Modern Tech Stack**: Built with Astro, TypeScript, and Tailwind CSS
- **GraphQL Integration**: Flexible data querying with Apollo Client
- **Lightbox Gallery**: Full-screen image viewing with smooth transitions
- **Image Optimization**: Automatic image optimization and lazy loading
- **Responsive Design**: Mobile-first design that works on all devices
- **CMS Integration**: Ready for headless CMS integration (Strapi, Contentful, etc.)
- **Performance Optimized**: Fast loading times and smooth user experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/leaf-digital-gallery.git
cd leaf-digital-gallery
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:4321`

## 🛠️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# GraphQL Configuration
PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql

# CMS Configuration (optional)
PUBLIC_CMS_API_URL=http://localhost:1337/api
PUBLIC_CMS_API_KEY=your_cms_api_key
PUBLIC_CMS_SPACE_ID=your_space_id
PUBLIC_CMS_ENVIRONMENT=development
```

### GraphQL Setup

The application is configured to work with GraphQL APIs. Update the `PUBLIC_GRAPHQL_ENDPOINT` in your environment variables to point to your GraphQL server.

Example GraphQL schema for galleries:

```graphql
type Image {
  id: ID!
  url: String!
  alt: String!
  caption: String
  width: Int!
  height: Int!
  tags: [String!]
  createdAt: String!
}

type Gallery {
  id: ID!
  title: String!
  description: String
  slug: String!
  coverImage: Image!
  images: [Image!]!
  createdAt: String!
  updatedAt: String!
}

type Query {
  galleries: [Gallery!]!
  gallery(slug: String!): Gallery
  images(limit: Int, offset: Int, tags: [String!]): [Image!]!
}
```

### CMS Integration

The application includes a flexible CMS service that can be adapted for various headless CMS providers:

- **Strapi**: Update the API URL and use the built-in Strapi integration
- **Contentful**: Modify the CMS service for Contentful's API
- **Sanity**: Adapt the service for Sanity's GraphQL API

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── GalleryCard.astro
│   ├── GalleryGrid.astro
│   ├── GalleryHeader.astro
│   ├── Hero.astro
│   ├── ImageGrid.astro
│   └── Navigation.astro
├── layouts/            # Page layouts
│   └── BaseLayout.astro
├── lib/               # Utilities and services
│   ├── cms.ts         # CMS integration
│   └── graphql.ts     # GraphQL configuration
├── pages/             # Application pages
│   ├── gallery/       # Gallery pages
│   ├── about.astro
│   ├── contact.astro
│   └── index.astro
└── styles/           # Global styles
```

## 🎨 Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the design by:

1. Modifying the color palette in `tailwind.config.mjs`
2. Updating component styles in individual `.astro` files
3. Adding custom CSS in the `src/styles/` directory

### Adding New Pages

1. Create a new `.astro` file in the `src/pages/` directory
2. Use the `BaseLayout` component for consistent styling
3. Add navigation links in `src/components/Navigation.astro`

### Custom Components

Create new components in the `src/components/` directory:

```astro
---
// src/components/MyComponent.astro
export interface Props {
  title: string;
  content?: string;
}

const { title, content } = Astro.props;
---

<div class="my-component">
  <h2>{title}</h2>
  {content && <p>{content}</p>}
</div>
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Upload the `dist/` folder to Netlify

### Deploy to GitHub Pages

1. Install the Astro GitHub Pages adapter:
```bash
npm install @astrojs/node
```

2. Update `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  adapter: node({ mode: 'standalone' }),
  output: 'server',
  site: 'https://yourusername.github.io',
});
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

### Code Style

The project uses TypeScript for type safety. Make sure to:

- Add proper type definitions for props and data
- Use consistent naming conventions
- Follow Astro's component patterns

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Astro](https://astro.build/) - The web framework for content-driven websites
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Apollo Client](https://www.apollographql.com/docs/react/) - GraphQL client
- [Picsum Photos](https://picsum.photos/) - Lorem Ipsum for photos

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](https://docs.astro.build/)
2. Search existing [issues](https://github.com/yourusername/leaf-digital-gallery/issues)
3. Create a new issue with detailed information

---

Built with ❤️ using Astro and modern web technologies.
