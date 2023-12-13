const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://lortdemolax:8h1AOdGi8Rurlr96@tawkd.kj1qxun.mongodb.net/Plan_Zajec?retryWrites=true&w=majority',
  JwtSecret: process.env.JWT_SECRET || 'secret'
};

export default config;
