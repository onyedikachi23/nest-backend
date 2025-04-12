/** @format */

export const connection: Connection = {
	CONNECTION_STRING: "CONNECTION_STRING",
	DB: "MYSQL",
	DBNAME: "TEST",
};

export interface Connection {
	CONNECTION_STRING: string;
	DB: string;
	DBNAME: string;
}
