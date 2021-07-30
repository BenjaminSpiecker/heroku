const config = {
	dbUser: process.env.DB_USER || 'postgres',
	dbPassword: process.env.DB_PASSWORD || '1234',
	dbHost: process.env.DB_HOST || 'localhost',
	dbName: process.env.DB_NAME || 'workshop',
	dbPort: process.env.DB_PORT || '5432',
	dev: process.env.NODE_ENV !== 'production',
	port: process.env.API_PORT || '3001',
	host: process.env.API_host || 'localhost',
	cors: process.env.CORS || 'http://localhost:3000',
	secret: process.env.SECRET || "9u#6j2pB#UqZ@9sQ",
	session_secret: process.env.SESSION_SECRET || "7QvMNrpfn.@Wj!3E",
	privateApiKey: process.env.STRIPE_PRIVATE_API_KEY || "sk_test_51JEWhNDNEDWq2u3Vqp31vMXUSALof4hsmDJqq846gqhLnt8GW5g6wtlMxSGPCtCSlaKDbt2RA3IdPJMcjZO0cYO800Q0E1Bz5D",
	gmail_user: process.env.GMAIL_USER || 'pepe@gmail.com',
	gmail_password: process.env.GMAIL_PASSWORD || '123456'
};

export default config;
