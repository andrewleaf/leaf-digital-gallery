/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GRAPHQL_ENDPOINT: string;
  readonly PUBLIC_CMS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
