/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_ENABLE_AUTH: string
  readonly VITE_ENABLE_CART: string
  readonly VITE_ENABLE_WISHLIST: string
  readonly VITE_ITEMS_PER_PAGE: string
  readonly VITE_ENABLE_DARK_MODE: string
  readonly VITE_ANALYTICS_ID?: string
  readonly VITE_ERROR_REPORTING?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
