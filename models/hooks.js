export const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const runValidateUpdate = function (next) {
  this.options.runValidators = true;
  next();
};
