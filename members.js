
const express = require('express');
const uuid = require('uuid');
const routers = express.Router();
const members = require('../../members');


// GET All Members

routers.get('/', (req, res) => {
    res.json(members);
 });
 
 // get single members
 routers.get('/:id', (req, res) => {
     const found = members.some(member => member.id === parseInt(req.params.id));
 
     if(found) {
     res.json(members.filter(member => member.id === parseInt(req.params.id)));
     } else {
         res.status(400).json({ msg: `No Member with the id of ${req.params.id}`});
     }
 });

 // create member
 routers.post('/', (req, res) => {
    const newMember = {
      id: uuid.v4(),
      name: req.body.email,
      status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        res.status(400).json({ msg: 'please include a name and email' });
    } 

    members.push(newMember);
     res.json(members);
 // res.redirect('/'); 
});


 //update member

  routers.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
    const updMember = req.body;
    members.forEach(member => {
        if(member.id === parseInt(req.params.id)) {
            member.name = updMember.name ? updMember.name : member.name;
            member.email = updMember.email ? updMember.email : member.email;

            res.json({ msg: 'Member updated', member });
        }
    })
    } else {
        res.status(400).json({ msg: `No Member with the id of ${req.params.id}`});
    }
});

// Delete  Member
routers.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
       res.json({ msg: 'memeber deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ msg: `No Member with the id of ${req.params.id}`});
    }
});



 module.exports = routers;