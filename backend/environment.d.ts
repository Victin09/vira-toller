declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      HTTPS_DEV: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_URL: string;
      DB_NAME: string;
      JWT_TOKEN_SECRET: string;
      JWT_TOKEN_EXPIRE: string;
      JWT_COOKIE_EXPIRE: number;
      SMTP_HOST: string;
      SMTP_PORT: number;
      SMTP_SECURE: boolean;
      SMTP_AUTH_TYPE: string;
      SMTP_AUTH_USER: string;
      SMTP_AUTH_CLIENT_ID: string;
      SMTP_AUTH_CLIENT_SECRET: string;
      SMTP_AUTH_REFRESH_TOKEN: string;
      SMTP_AUTH_ACCESS_TOKEN: string;
    }
  }
}

export {};
