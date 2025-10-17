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
        message: error.details[0].message,
      });
    }
    next();
  };
};