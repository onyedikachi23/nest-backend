/** @format */

export default () => ({
	port: (() => {
		const port = process.env.DB_PORT;
		if (!port) {
			throw new Error("Invalid env DB_PORT: " + port);
		}
		return parseInt(port);
	})(),
	secret: process.env.SECRET,
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
	dbName: process.env.DB_NAME,
	dbHost: process.env.DB_HOST,
});
