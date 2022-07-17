const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DB_CONFIG = require('../../config');

const router = express.Router();

const authSchema = joi.object({
  full_name: joi.string(),
  email: joi.string().required(),
  password: joi.string().min(4).required(),
});

router.post('/register', async (req, res) => {
  const { full_name: fullName, email, password } = req.body;
  try {
    await authSchema.validateAsync({ full_name: fullName, email, password });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(

      `SELECT * FROM users WHERE email="${email}" `,
    );
    if (rows.length > 0) {
      return res.status(400).json({
        status: 'Bad Request!',
        error: 'User already exists!',
      });
    }
    const [response] = await connection.query('INSERT INTO users SET ?', {
      full_name: fullName,
      email,
      password: hashedPassword,
    });
    await connection.end();
    return res.json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    await authSchema.validateAsync({ email, password });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [user] = await connection.query(
      `SELECT * FROM users WHERE email="${email}"`,
    );
    await connection.end();
    if (user.length === 0) {
      return res
        .status(400)
        .json({ status: 'Bad Request!', error: 'User not found!' });
    }
    const compare = await bcrypt.compare(password, user[0].password);
    if (!compare) {
      return res
        .status(400)
        .json({ status: 'Bad Request!', error: 'Password is incorrect!' });
    }
    const token = jwt.sign(
      {
        id: user[0].id,
      },
      process.env.JWT_SECRET,
    );
    return res.json({
      user: {
        id: user[0].id,
        fullName: user[0].full_name,
        reg_timestamp: user[0].reg_timestamp,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
