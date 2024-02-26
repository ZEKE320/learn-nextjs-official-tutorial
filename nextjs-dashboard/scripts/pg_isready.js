require('dotenv').config();
const { exec } = require('child_process');
const { exit } = require('process');

async function main() {
  console.log(
    `Host: ${process.env.POSTGRES_HOST}\nPort: ${process.env.POSTGRES_PORT}\nDatabase: ${process.env.POSTGRES_DATABASE}\n`,
  );

  const command = `pg_isready -d ${process.env.POSTGRES_DATABASE} -h ${process.env.POSTGRES_HOST} -p ${process.env.POSTGRES_PORT}`;
  console.log(`${command}\n`);

  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error(`${error}`);
    }
    if (stderr) {
      console.error(`${stderr}`);
    }
    console.log(`${stdout}`);
  });
}

main();
