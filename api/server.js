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

server.put('/:id', (req, res) => {
    const changes = req.body;
    db('accounts')
        .where({ id: req.params.id })
        .update(changes)
        .then(count => {
            if(count > 0) {
                res.status(200).json({ 
                    message: 'account updated successfully'
                })
            } else {
                res.status(404).json({ 
                    message: 'Account not found'
                 })
            }
        })
        .catch(error => {
            res.status(500).json({ 
                message: 'Oh no! There was an error!'
            })
        });
});

server.delete('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if(count > 0) {
                res.status(200).json({ 
                    message: 'record deleted successfully'
                 })
            } else {
                res.status(404).json({ 
                    message: 'That account could not be found 🤷🏽‍♀️'
                 })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Oops we ran into an error'
            });
        });
});

module.exports = server;
