const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, res, next) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortid.generate();
    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }
    const to = baseUrl + "/t/" + code;
    const link = new Link({
      code,
      to,
      from,
      owner: req.userId,
    });
    await link.save();

    res.status(201).json({ link });
  } catch (error) {
    next(error);
  }
});
router.get("/", auth, async (req, res, next) => {
  try {
    const links = await Link.find({ owner: req.user.userId }); ///???
    res.json(links);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", auth, async (req, res, next) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
