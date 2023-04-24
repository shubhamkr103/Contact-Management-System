const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/")
  .get(getContacts)
  .post(createContact)
  .all((req, res, next) => {
    const err = new Error("Method not allowed");
    err.status = 405;
    next(err);
  });

router.route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact)
  .all((req, res, next) => {
    const err = new Error("Method not allowed");
    err.status = 405;
    next(err);
  });

router.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

module.exports = router;
