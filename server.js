
const express = require('express')

const Post = require('./data/db.js')

//const postRoute = require('./routes.js')

const server = express();

//server.use('/api/posts', postRoute)

server.use(express.json())

server.get('/api/posts', (req, res) => {
    Post.find()
    .then(result => {
        res.status(200).json(result)})
    .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
    
})

server.post('/api/posts', (req, res) => {

    const addPost = req.body;

    if(addPost.title && addPost.contents){

    Post.insert(addPost)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(error => {
       res.status(500).json({ error: "There was an error while saving the post to the database" })
    })

    }else{
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

server.post('/api/posts/:id/comments', (req, res) => {
    const comment = req.body;
    const id = req.params.id;

    if(comment.id !== id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }

    Post.insertComment(comment)
    .then(com => {
        res.status(201).json(com)
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id
    const body = req.body;

    // if(!id){
    //     res.status(404).json({ message: "The post with the specified ID does not exist." })
    // }

    Post.findById(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

server.get('/api/posts/:id/comments', (req, res) => {
    const id = req.params.id

    //if(id){
    //res.status(404).json({ message: "The post with the specified ID does not exist." })
    //}

    Post.findPostComments(id)
    .then(com => {
        res.status(201).json(com)
    })
    .catch(errer => 
        res.status(500).json({ error: "The comments information could not be retrieved." }))
})

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id

    //if(id){
    //res.status(404).json({ message: "The post with the specified ID does not exist." })
    //}

    Post.remove(id)
    .then(result => {
        res.status(200).json({message: 'post deleted succesfully'})
    })
    .catch(error => {
        res.status(500).json({ error: "The post could not be removed" })
    })
})

module.exports = server