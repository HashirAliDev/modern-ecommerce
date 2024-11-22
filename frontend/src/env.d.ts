/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_ENABLE_AUTH: string
  readonly VITE_ENABLE_CART: string
  readonly VITE_ITEMS_PER_PAGE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
