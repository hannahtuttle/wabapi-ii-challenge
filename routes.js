const express = require('express')

const router = express.Router();

const Post = require('./data/db.js')

router.get('/', (req, res) => {
    res.status(200).json({api: '...up'})
})

router.post('/', (req, res) => {

    const addPost = req.body;

    // if(addPost.title && addPost.contents){

    Post.insert(addPost)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })

    // }else{
    //     res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    // }
})

router.post('/:id/comments', (req, res) => {
    const comment = req.body;
    const id = req.params.id;

    // if(comment.id !== id){
    //     res.status(404).json({ message: "The post with the specified ID does not exist." })
    // }

    Post.insertComment(comment)
    .then(com => {
        res.status(201).json(com)
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})



module.exports = router;