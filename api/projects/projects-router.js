// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
// const Actions = require('../actions/actions-model')

const router = express.Router();

router.get('/', (req, res)=>{
    Projects.get()
        .then(project=>{
            res.status(200).json(project)
        })
        .catch(error=>{
            res.status(500).json(error.message)
        })
})

router.get('/:id', (req,res)=>{
    const {id} = req.params

    Projects.get(id)
        .then(project=>{
            if(project){
                res.status(200).json(project)
            } else{
                res.status(404).json({message: `project not found with id ${id}`})
            }
        })
        .catch(error=>{
            res.status(500).json({errorMessage:error.message})
        })
})
router.post('/', (req, res)=>{
    if(!req.body.name || !req.body.description){
        res.status(400).json({message: `Please fill out all the fields`})
    }

    Projects.insert(req.body)
        .then(project=>{
            res.status(201).json(project)
        })
        .catch(error=>{
            res.status(500).json({errorMessage: error.message})
        })
})

router.put('/:id', (req,res)=>{
    const {id} = req.params
    const changes = req.body

    Projects.update(id, changes)
        .then(project=>{
            res.status(200).json(project)
        })
        .catch(error=>{
            res.status(500).json({errorMessage:error.message})
        })
})
router.delete('/:id', (req, res)=>{
    const {id} = req.params

    Projects.remove(id)
        .then(project=>{
            // res.status(200).json({message:'project deleted'})
            if(project){
                res.status(200).json({message: 'project deleted'})
            } else{
                res.status(404).json({ message: "The project with the specified ID does not exist.." })
            }
        })
        .catch(error=>{
            res.status(500).json({errorMessage:error.message})
        })
})
router.get('/:id/actions', (req, res)=>{
    const {id} = req.params

    Projects.getProjectActions(id)
        .then(action=>{
            res.status(200).json(action)
        })
        .catch(error=>{
            res.status(500).json({errorMessage:error.message})
        })


})
module.exports = router;