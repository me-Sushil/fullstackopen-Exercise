const router = require("express").Router();

const { User, Blog, ReadingList } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        as: "authored_blogs",
        // attributes: { exclude: ["userId"] },
        attributes: ["id", "author", "title", "url", "likes"],
      },
    });
    if (users) {
      res.json(users);
    }
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     // 1. Fetch user and the associated reading list blogs
//     const user = await User.findByPk(req.params.id, {
//       attributes: ["name", "username"], // Only fetch base user attributes
//       include: [
//         {
//           model: Blog,
//           as: "reading_lists", // Must use the alias from models/index.js
//           // Include the Blog fields required for the final 'readings' array
//           attributes: ["id", "url", "title", "author", "likes", "year"],
//           // Exclude attributes from the join table (like 'read' status)
//           through: {
//             attributes: [],
//           },
//         },
//       ],
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // 2. Transform the Sequelize object into the required custom format
//     const userJson = user.toJSON();

//     const response = {
//       name: userJson.name,
//       username: userJson.username,
//       // The blogs are attached under the alias 'reading_lists', rename to 'readings'
//       readings: userJson.reading_lists,
//     };

//     res.json(response);
//   } catch (error) {
//     next(error);
//   }
// });
router.get("/:id", async (req, res, next) => {
  try {
    // 1. Initialize the filter object for the join table
    const readFilter = {};
    
    // 2. Check for the 'read' query parameter and apply the filter
    if (req.query.read) {
        // Query parameters are strings, so convert 'true'/'false' to booleans
        const readStatus = req.query.read === 'true'; 
        
        // Add a filter for the 'read' column in the ReadingList join table
        readFilter.read = readStatus;
    }
    
    // 3. Fetch user and the reading list
    const user = await User.findByPk(req.params.id, {
      attributes: ['name', 'username'],
      include: [
        {
          model: Blog,
          as: "reading_lists", 
          
          attributes: ["id", "url", "title", "author", "likes", "year"],
          
          // Include 'read' status and 'id' from the join table
          through: {
            attributes: ['read', 'id'],
            //  APPLY THE CONDITIONAL FILTER HERE
            where: readFilter, 
          },
        },
      ],
    });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // 4. Transform and respond
    const userJson = user.toJSON(); 

    const response = {
        name: userJson.name,
        username: userJson.username,
        readings: userJson.reading_lists 
    };

    res.json(response);

  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username }, //body.username
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Update allowed fields
    if (req.body.username) {
      user.username = req.body.username;
    }
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
