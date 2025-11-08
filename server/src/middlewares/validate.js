module.exports = (schema, source = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[source], {
      abortEarly: true,
      allowUnknown: false,
      stripUnknown: true,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
        message: error.details[0].message,
        field: error.details[0].path[0],
      });
    }
    next();
  };
};