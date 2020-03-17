// const express = require('express');

// const db = require('../data/dbConfig.js');

// const router = express.Router();

// router.get('/', (req, res) => {
//     db.select('*').from('accounts')
//         .then(rows => {
//             res.status(200).json({ data: rows })
//         })
//         .catch(error => {
//             res.status(500).json({ 
//                 message: "Sorry, ran into errors" 
//             });
//         });
// });

// router.get('/:id', (req, res) => {
//     db('accounts')
//         .where({ id: req.params.id })
//         .first()
//         .then(rows => {
//             if(rows) {
//                 res.status(200).json({ data: rows })
//             } else {
//                 res.status(404).json({ 
//                     message: 'Post not found'
//                 });
//             }
//         })
//         .catch(error => {
//             res.status(500).json({ 
//                 message: "Sorry, ran into errors" 
//             });
//         });
// });