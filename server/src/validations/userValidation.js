const Joi = require('joi');

exports.deleteUserSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});