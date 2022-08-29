//utilisation express-validator

const { body, validationResult, check } = require('express-validator');

//Valider pour movies
const validateMovie = [
  body("title").isLength({ max: 255 }).notEmpty().isString(),
  body("director").isLength({ max: 255 }).notEmpty().isString(),
  body("year").isLength({ max: 255 }).notEmpty().isString(),
  body("color").isLength({ max: 255 }).notEmpty().isString(),
  body("duration").isLength({ max: 255 }).isInt(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

// Valider POST user 
const validateUser = [
  body("firstname").isLength({ max: 255 }).isString().notEmpty(),
  body("lastname").isLength({ max: 255 }).isString().notEmpty(),
  body("city").isLength({ max: 255 }).isString(),
  body("language").isLength({ max: 255 }).isString(),
  check("email").trim().normalizeEmail().isEmail().withMessage("Invalid email").isLength({ max: 255 }).custom(async email => {
    const value = await isEmailInUse(email);
    if (value) {
        throw new Error('Email is already exists!!!');
    }
})
.withMessage('Email is already exists!!!'),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

// valider PUT user
const validateUserId = [
  body("firstname").isLength({ max: 255 }).isString().notEmpty(),
  body("lastname").isLength({ max: 255 }).isString().notEmpty(),
  body("city").isLength({ max: 255 }).isString(),
  body("language").isLength({ max: 255 }).isString(),
  body("email").isLength({ max: 255 }).isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = {
  validateMovie,
  validateUser,
  validateUserId,
};