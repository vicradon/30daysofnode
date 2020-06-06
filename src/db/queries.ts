const Pool = require("pg").Pool;

const pool = new Pool({
  user: "vicradon",
  host: "localhost",
  database: "users",
  password: "password",
  port: 5432,
});

export default pool;
