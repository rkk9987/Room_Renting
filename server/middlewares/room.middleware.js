const joi = require("joi");

const roomAuthentication = (req, res, next) => {
  const roomSchema = joi.object({
    name: joi.string().min(4).max(20).required(),
    address: joi.string().min(4).max(100).required(),
    rent: joi.number().min(1000).max(10000000).required(),
    available: joi.string().min(4).max(20),
    owner: joi.string().min(4).max(20),
  });

  const { error } = roomSchema.validate(req.body);

  if (error)
    return res
      .status(404)
      .json({ msg: `wrong input ${error.details[0].message}` });

  next();
};

module.exports = {
  roomAuthentication,
};
