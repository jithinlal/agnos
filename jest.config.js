module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'~/(.*)': '<rootDir>/src/$1',
	},
	setupFiles: ['<rootDir>/src/.jest/.env.test'],
	setupFilesAfterEnv: ['jest-extended'],
};
