// controllers/logout.js
const router = require('express').Router();
const { Session } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.delete('/', tokenExtractor, async (req, res) => {
  try {
    const authorization = req.get("authorization");
    const rawToken = authorization.substring(7);

    // Delete the session record associated with the token and user
    const deletedCount = await Session.destroy({
      where: {
        userId: req.decodedToken.id,
        token: rawToken
      }
    });

    if (deletedCount > 0) {
      return res.status(204).end();
    } else {
      return res.status(404).json({ error: 'Active session not found.' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;