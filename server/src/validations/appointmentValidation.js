const Joi = require("joi");

exports.createAppointmentSchema = Joi.object({
  customer_name: Joi.string().min(2).max(100).required().messages({
    "string.min": "Tên khách hàng phải có ít nhất 2 ký tự",
    "string.max": "Tên khách hàng không được quá 100 ký tự",
    "any.required": "Tên khách hàng không được để trống",
  }),
  customer_phone: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .required()
    .messages({
      "string.pattern.base": "Số điện thoại phải có 10-11 chữ số",
      "any.required": "Số điện thoại không được để trống",
    }),
  service_id: Joi.number().integer().positive().required().messages({
    "number.base": "ID dịch vụ không hợp lệ",
    "any.required": "Vui lòng chọn dịch vụ",
  }),
  staff_id: Joi.number().integer().positive().required().messages({
    "number.base": "ID barber không hợp lệ",
    "any.required": "Vui lòng chọn barber",
  }),
  appointment_date: Joi.alternatives()
    .try(
      Joi.date().iso(),
      Joi.string().pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    )
    .required()
    .messages({
      "alternatives.match": "Ngày hẹn không hợp lệ",
      "any.required": "Vui lòng chọn ngày và giờ hẹn",
    }),
  note: Joi.string().max(500).optional().allow("", null).messages({
    "string.max": "Ghi chú không được quá 500 ký tự",
  }),
});

exports.updateAppointmentSchema = Joi.object({
  customer_name: Joi.string().min(2).max(100).optional().messages({
    "string.min": "Tên khách hàng phải có ít nhất 2 ký tự",
    "string.max": "Tên khách hàng không được quá 100 ký tự",
  }),
  customer_phone: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .optional()
    .messages({
      "string.pattern.base": "Số điện thoại phải có 10-11 chữ số",
    }),
  service_id: Joi.number().integer().positive().optional().messages({
    "number.base": "ID dịch vụ không hợp lệ",
  }),
  staff_id: Joi.number().integer().positive().optional().messages({
    "number.base": "ID barber không hợp lệ",
  }),
  appointment_date: Joi.alternatives()
    .try(
      Joi.date().iso(),
      Joi.string().pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    )
    .optional()
    .messages({
      "alternatives.match": "Ngày hẹn không hợp lệ",
    }),
  status: Joi.string()
    .valid("pending", "confirmed", "completed", "cancelled")
    .optional()
    .messages({
      "any.only": "Trạng thái không hợp lệ",
    }),
  note: Joi.string().max(500).optional().allow("", null).messages({
    "string.max": "Ghi chú không được quá 500 ký tự",
  }),
});

exports.updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "confirmed", "completed", "cancelled")
    .required()
    .messages({
      "any.only": "Trạng thái không hợp lệ",
      "any.required": "Trạng thái không được để trống",
    }),
});

