const router = require("express").Router();
const {
  Themes, Sets, Inventories, Part_Categories, Parts, Colors,
  Inventory_Parts, Part_Relationships, Elements, Minifigs,
  Inventory_Minifigs, Inventory_Sets, Users, User_Inventories
} = require("../../../models");
require("dotenv").config();
const nodemailer = require("nodemailer");

// get all users
router.get("/", (req, res) => {
  Users.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Users,
        attributes: ["id", "email", "username"]
      }
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create user
router.post("/", (req, res) => {
  Users.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        // let transporter = nodemailer.createTransport({
        //   service: "gmail",
        //   auth: {
        //     user: process.env.EMAIL,
        //     pass: process.env.PASS,
        //   },
        // });

        // let mailOptions = {
        //   from: process.env.EMAIL,
        //   to: dbUserData.email,
        //   subject: "Hello, Friend!",
        //   text: "Welcome to Brick Detective! Your new favorite site for catologing lego pieces and sets.",
        // };

        // transporter.sendMail(mailOptions, function (err, data) {
        //   if (err) {
        //     console.log("Error occured", err);
        //   } else {
        //     console.log("Email Sent");
        //   }
        // });

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login
router.post("/login", (req, res) => {
  Users.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that username!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

// logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// update user
router.put("/:id", (req, res) => {
  Users.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user with that user ID!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete user
router.delete("/:id", (req, res) => {
  Users.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user with that user ID!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get user info
router.get("/id", (req, res) => {
  Users.findOne({
    where: {
      id: req.body.user_id,
    },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Users,
        attributes: ["id", "email", "username"]
      }
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user with that user ID!" });
        return;
      }

      res.json(dbUserData);
      return;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all user inventories
router.get("/inventory", (req, res) => {
  User_Inventories.findAll({
    include: [
      {
        model: User_Inventories,
        attributes: ["user_id", "part_num", "color_id", "quantity"]
      }
    ],
  })
    .then((dbUserData) => {
      res.json(dbUserData);
      return;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get user inventory
router.get("/inventory/:id", (req, res) => {
  User_Inventories.findAll({
    where: {
      user_id: req.params.id,
    },
    include: [
      {
        model: User_Inventories,
        attributes: ["user_id", "part_num", "color_id", "quantity"]
      }
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user with that user ID!" });
        return;
      }

      res.json(dbUserData);
      return;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/inventory/:id", (req, res) => {
  User_Inventories.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user with that user ID!" });
        return;
      }
      User_Inventories.findAll({
        where: {
          id: req.params.id,
        },
      })
    });
});

router.post("/inventory/:id", (req, res) => {
  Users.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user with that user ID!" });
        return;
      }
      let objlist = [];
      for (const obj of req.body.parts_list) {
        objlist.push({
          user_id: req.params.id,
          ...obj
        });
      }
      User_Inventories.bulkCreate(objlist);
      return;
    });
});

module.exports = router;
