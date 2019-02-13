const express = require("express");

const Users = require("./userDb");

const router = express.Router();

//Get

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved" })
    );
});

//Get user by specific id

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Users.getById(id).then(user => {
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with specified ID does not exist" });
    } else {
      res.status(200).json(user);
    }
  });
});

//Post

router.post("/", (req, res) => {
  const newUser = req.body;
  if (!newUser.name) {
    res.status(400).json({ message: "Please provide a new user name" });
  } else {
    Users.insert(newUser)
      .then(user => {
        Users.getById(user.id).then(user => {
          res.status(201).json({ user });
        });
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: "There was an error while saving the post to the database"
          });
      });
  }
});

// Delete

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Users.getById(id)
     .then(user => {
         if (!user) {
             res.status(404)
             .json({ message: "The user with the specified ID does not exist"})
         } else {
             Users.remove(id)
             .then(user => {
                 res.status(204).end();
             })
         }
     })
     .catch(err => res.status(500).json({ error: "This user could not be removed"}))
})

//Put

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    if(!updatedUser.name) {
        res.status(400).json ({ message: "Please provide a name for the user"})
    }
})

module.exports = router;
