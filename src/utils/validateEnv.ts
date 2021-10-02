import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
	cleanEnv(process.env, {
		DOMAIN: str(),
		NODE_ENV: str(),
		PORT: port(),
		MONGO_PATH: str(),
		SECRET: str(),
		REDIS_URL: str(),
	});
}

export default validateEnv;
