declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DATABASE: string;
    DATABASE_URL: string;
    USERNAME: string;
    PASSWORD: string;
    NODE_ENV: "production" | "development";
    SESSION_SECRET: string;
    SERVER_URL: string;
    CLIENT_URL: string;
    REDIS_URL: string;
  }
}
