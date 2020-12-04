// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model')

const router = express.Router();

router.get('/', (req, res)=>{
    Actions.get()
        .then(actions=>{
            res.status(200).json(actions)
        })
        .catch(error=>{
            res.status(500).json(error.message)
        })
})

// router.get('/:id', (req, res)=>{
//     const {id} = req.params
//     Actions.get(id)
//         .then(action=>{
//             res.status(200).json(action)
//         })
//         .catch(error=>{
//             res.status(500).json({errorMessage:error.message})
//         })
// })
router.get('/:id', (req, res)=>{
    const {id} = req.params
    Actions.get(id)
        .then(action=>{
            if(action){
                res.status(200).json(action)
            } else{
                res.status(404).json({message: `user not found with id ${id}`})
            }
        })
        .catch(error=>{
            res.status(500).json({errorMessage:error.message})
        })
})


router.post('/', (req, res)=>{
    if(!req.body.project_id || !req.body.description || !req.body.notes){
        res.status(400).json({message: `Please fill out all the fields`})
    } else{
        Actions.insert(req.body)
        .then(action=>{
            res.status(201).json(action)
        })
        .catch(error=>{
            res.status(500).json({errorMessage: error.message})
        })
    }
    
    
})

router.put('/:id', (req, res)=>{
    const {id} = req.params
    const changes = req.body
    if(!req.body.project_id || !req.body.description || !req.body.notes){
        res.status(400).json({message: `Please fill out all the fields`})
    }else{
         Actions.update(id, changes)
        .then(action=>{
            res.status(200).json(action)
        })
        .catch(error=>{
            res.status(500).json({errorMessage: error.message})
        })
    }

   
})

router.delete('/:id', (req, res)=>{
    const {id} = req.params

    Actions.remove(id)
        .then(action=>{
            res.status(200).json({message:'action deleted'})
        })
        
})


module.exports = router;
