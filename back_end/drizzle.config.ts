

export default {
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/db/schema',
  out: "./migrations",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  }
}
