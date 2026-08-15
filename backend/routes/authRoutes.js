const express = require('express');
const fs = require('fs');
const router = express.Router();
const USERS_FILE = './data/users.json';

router.post('/register', (req, res) => {
 const { name, email, password } = req.body;
 const users = JSON.parse(fs.readFileSync(USERS_FILE));
 if (users.find(u => u.email === email)) return res.status(400).json({message:'User already exists'});
 users.push({ id: Date.now(), name, email, password });
 fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
 res.status(201).json({message:'User registered'});
});

router.post('/login', (req, res) => {
 const { email, password } = req.body;
 const users = JSON.parse(fs.readFileSync(USERS_FILE));
 const user = users.find(u => u.email === email && u.password === password);
 if (!user) return res.status(401).json({message:'Invalid credentials'});
 res.json({message:'Login successful', user});
});

module.exports = router;