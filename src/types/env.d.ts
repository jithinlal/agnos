declare namespace NodeJS {
  interface ProcessEnv {
    DOMAIN: string;
    NODE_ENV: string;
    PORT: string;
    MONGO_PATH: string;
    SECRET: string;
  }
}