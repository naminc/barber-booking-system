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
  password: Joi.string().min(6).required().messages({
    "string.min": "Trường mật khẩu phải có ít nhất 6 ký tự",
    "any.required": "Mật khẩu không được để trống",
  }),
  role: Joi.string().valid("user", "admin").default("user").messages({
    "any.only": "Vai trò không hợp lệ",
  }),
});

exports.deleteUserSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

exports.createUserSchema = Joi.object({
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
  password: Joi.string().min(6).required().messages({
    "string.min": "Trường mật khẩu phải có ít nhất 6 ký tự",
    "any.required": "Mật khẩu không được để trống",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .optional()
    .allow("", null)
    .messages({
      "string.pattern.base": "Số điện thoại phải có 10-11 chữ số",
    }),
  role: Joi.string().valid("user", "admin").required().messages({
    "any.only": "Vai trò không hợp lệ",
    "any.required": "Vai trò không được để trống",
  }),
  status: Joi.string()
    .valid("active", "inactive")
    .default("active")
    .messages({
      "any.only": "Trạng thái không hợp lệ",
    }),
});

exports.updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional().allow("").messages({
    "string.min": "Trường họ và tên phải có ít nhất 2 ký tự",
    "string.max": "Trường họ và tên không được quá 50 ký tự",
    "string.empty": "Trường họ và tên không được để trống",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .optional()
    .allow("")
    .messages({
      "string.email": "Trường email không hợp lệ",
      "string.empty": "Trường email không được để trống",
    }),
  phone: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .optional()
    .allow("", null)
    .messages({
      "string.pattern.base": "Số điện thoại phải có 10-11 chữ số",
    }),
  password: Joi.string().min(6).optional().allow("").messages({
    "string.min": "Trường mật khẩu phải có ít nhất 6 ký tự",
  }),
  role: Joi.string().valid("user", "admin").optional().messages({
    "any.only": "Vai trò không hợp lệ",
  }),
  status: Joi.string().valid("active", "inactive").optional().messages({
    "any.only": "Trạng thái không hợp lệ",
  }),
});

exports.forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Trường email không hợp lệ",
      "any.required": "Trường email không được để trống",
    }),
});

exports.resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    "any.required": "Token không được để trống",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Trường mật khẩu phải có ít nhất 6 ký tự",
    "any.required": "Mật khẩu không được để trống",
  }),
});