const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    db.select('*')
        .from('accounts')
        .then(rows => {
            res.status(200).json({ data: rows })
        })
        .catch(error => {
            res.status(500).json({ 
                message: "Sorry, ran into errors" 
            });
        });
});

server.get('/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(rows => {
            if(rows) {
                res.status(200).json({ data: rows })
            } else {
                res.status(404).json({ 
                    message: 'Post not found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({ 
                message: "Sorry, ran into errors" 
            });
        });
});

server.post('/', (req, res) => {
    db("accounts")
    .insert(req.body, 'id')
    .then(ids => {
        res.status(201).json({ results: ids })
    })
    .catch(error => {
        res.status(500).json({ 
            message: "sorry, ran into an error"
        });
    });
});

module.exports = server;
