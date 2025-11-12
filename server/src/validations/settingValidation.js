const Joi = require("joi");

exports.updateSettingSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).required().messages({
    "string.empty": "Tiêu đề không được để trống",
    "any.required": "Thiếu trường title",
  }),
  keywords: Joi.string().allow("", null).max(255),
  description: Joi.string().allow("", null),
  domain: Joi.string().allow("", null).max(100),
  owner: Joi.string().allow("", null).max(100),
  email: Joi.string().email().allow("", null).max(150),
  phone: Joi.string().allow("", null).max(20),
  address: Joi.string().allow("", null),
  websiteName: Joi.string().allow("", null).max(32),
  slogan: Joi.string().allow("", null).max(100),
  iframeGoogleMap: Joi.string().allow("", null),
  developer: Joi.string().allow("", null).max(100),
});
