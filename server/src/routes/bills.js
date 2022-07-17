const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

const billsSchema = joi.object({
  group_id: joi.number().required(),
  amount: joi.number().required(),
  description: joi.string().required(),
});

router.get('/:id', isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      `SELECT * from bills WHERE group_id = ${Number(id)}`,
    );
    await connection.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', isLoggedIn, async (req, res) => {
  const { group_id: groupId, amount, description } = req.body;
  try {
    await billsSchema.validateAsync({ group_id: groupId, amount, description });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query('INSERT INTO egzaminas.bills SET ?', {
      group_id: groupId,
      amount,
      description,
    });
    await connection.end();
    return res.json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
