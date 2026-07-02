import { Pool } from "pg";

// Creating a connection pool using your local Mac setup
/*
Instead of opening and closing a database connection every single time a user clicks a button, 
the Pool class sets up a collection of persistent connections that stay open in the background, 
making data transfers lightning-fast. 
*/
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "vms_db",
  user: process.env.USER, // Automatically uses your Mac username
  password: "", // Left blank as per your Homebrew setup
});

// ADD THIS NEW BLOCK HERE TO CATCH THE HIDDEN ERROR:
pool.on("error", (err) => {
  console.error("Unexpected database error on idle client:", err.message);
});

export default pool;
