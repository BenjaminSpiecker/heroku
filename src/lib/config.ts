import dotenv from 'dotenv';

dotenv.config();

const config = {
	dbUser: process.env.DB_USER || 'postgres',
	dbPassword: process.env.DB_PASSWORD || '1234',
	dbHost: process.env.DB_HOST || 'localhost',
	dbName: process.env.DB_NAME || 'workshop',
	dbPort: process.env.DB_PORT || '5432',
	dev: process.env.NODE_ENV !== 'production',
	port: process.env.PORT || '3001',
	host: process.env.API_host || 'localhost',
	cors: process.env.CORS,
	secret: process.env.SECRET,
	session_secret: process.env.SESSION_SECRET,
	privateApiKey: process.env.STRIPE_PRIVATE_API_KEY,
	gmail_user: process.env.GMAIL_USER,
	gmail_password: process.env.GMAIL_PASSWORD
};

export default config;
