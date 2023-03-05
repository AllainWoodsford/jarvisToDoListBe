const express = require('express');
const bodyParser = require("body-parser");
const app = express();

//Environment Vars
const dotenv = require("dotenv");

//Postgres SQL connection Pool
const postgres = require('postgres');

dotenv.config();
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID, PGPORT } = process.env;
const URL =`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
app.use(bodyParser.json());



//Postgres connection
const sql = postgres(URL, { ssl: 'require' });
//Test connection Postgres
async function getPostgresVersion() {
    try{
        const result = await sql`select version()`;
        console.log(result);
    } catch (err) {
        console.log(err);
    }
    
  }

// Listen to the specified port, otherwise 3080
const PORT = process.env.PORT || 3080;
const server = app.listen(PORT, () => {
  console.log(`Server Running: http://localhost:${PORT}`);
  getPostgresVersion();
 
});


