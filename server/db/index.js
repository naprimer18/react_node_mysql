import mysql from 'mysql2';

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "company",
  password: "12345vlad"
});