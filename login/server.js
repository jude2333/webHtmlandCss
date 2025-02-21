const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    client.release();

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});