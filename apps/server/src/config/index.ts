import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  MONGODB_URI: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  ADMIN_USERNAME: z.string().default('admin'),
  ADMIN_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;

export const config = {
  port: parseInt(env.PORT, 10),
  mongoUri: env.MONGODB_URI,
  nodeEnv: env.NODE_ENV,
  admin: {
    username: env.ADMIN_USERNAME,
    password: env.ADMIN_PASSWORD,
    jwtSecret: env.JWT_SECRET,
  },
  isDev: env.NODE_ENV === 'development',
  isProd: env.NODE_ENV === 'production',
};
