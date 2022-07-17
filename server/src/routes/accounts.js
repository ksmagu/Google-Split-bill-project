const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

const accountSchema = joi.object({
  group_id: joi.number().required(),
});

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(`SELECT * FROM accounts 
    JOIN egzaminas.groups ON accounts.group_id = egzaminas.groups.id 
    JOIN users ON accounts.user_id = users.id HAVING user_id="${req.userId}"`);
    await connection.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', isLoggedIn, async (req, res) => {
  const { group_id: groupId } = req.body;
  try {
    await accountSchema.validateAsync({ group_id: groupId });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query('INSERT INTO egzaminas.accounts SET ?', {
      user_id: req.userId,
      group_id: groupId,
    });
    await connection.end();
    return res.json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
