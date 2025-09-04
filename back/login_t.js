import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(bodyParser.json());

// __dirname beállítása (mivel ES modul van)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB kapcsolat
const db = await mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Ocsi_2018',
  database: 'hibabejelento'
});

const JWT_SECRET = 'nagyonTitkosKulcs';

// 🔹 LOGIN/REGISTER oldal kiszolgálása
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/login_test.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/index.html'));
});

// 🔹 REGISZTRÁCIÓ
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Minden mező kitöltése kötelező' });
    }

    // Ellenőrizzük, van-e már email
    const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Ezzel az e-mail címmel már regisztráltak' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashed, 'user']);

    res.json({ message: 'Sikeres regisztráció' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Szerver hiba' });
  }
});

// 🔹 BEJELENTKEZÉS
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Hibás e-mail vagy jelszó' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Hibás e-mail vagy jelszó' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Szerver hiba' });
  }
});

// 🔹 Szerver indítása
app.listen(3000, () => console.log('Server fut: http://localhost:3000/login'));
