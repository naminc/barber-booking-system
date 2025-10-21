const Joi = require("joi");

exports.loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Trường email không hợp lệ",
      "any.required": "Trường email không được để trống",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Trường mật khẩu phải có ít nhất 6 ký tự",
    "any.required": "Trường mật khẩu không được để trống",
  }),
});

exports.registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.min": "Trường họ và tên phải có ít nhất 2 ký tự",
    "string.max": "Trường họ và tên không được quá 50 ký tự",
    "any.required": "Trường họ và tên không được để trống",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Trường email không hợp lệ",
      "any.required": "Trường email không được để trống",
    }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)"))
    .required()
    .messages({
      "string.min": "Trường mật khẩu phải có ít nhất 6 ký tự",
      "string.pattern.base":
        "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số",
      "any.required": "Mật khẩu không được để trống",
    }),
  role: Joi.string().valid("user", "admin").default("user").messages({
    "any.only": "Vai trò không hợp lệ",
  }),
});

exports.deleteUserSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});