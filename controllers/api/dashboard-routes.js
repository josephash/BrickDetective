const router = require("express").Router();
const { Movie, User, Comment } = require("../../models");
const withAuth = require("../utils/auth");

// get all comments for dashboard
router.get("/", withAuth, (req, res) => {
  // Retrieve all comments associated with the logged-in user
  Sets.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "set_id",
      "piece count",
      "user_id",
      "created_at",
    ],
    include: [
      {
        model: Set,
        attributes: ["id", "title", "set_id"],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((dbCommentData) => {
      // Map the comment data to plain objects
      const sets = dbCommentData.map((post) => post.get({ plain: true }));
      // Render the dashboard template with the comments data
      res.render("dashboard", { sets, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  // Find a specific comment by its ID
  Set.findByPk(req.params.id, {
    attributes: [
        "id",
        "set_id",
        "piece count",
        "user_id",
        "created_at",
    ],
    include: [
      {
        model: Set,
        attributes: ["id", "title", "piece count"],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbCommentData) => {
      if (dbCommentData) {
        // Get the plain object representation of the comment
        const comment = dbCommentData.get({ plain: true });
        // Render the edit-post template with the comment data
        res.render("edit-post", {
          comment,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
