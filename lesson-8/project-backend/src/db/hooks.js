export const handleSaveError = (error, doc, next) => {
  error.status = 400;
  next(error);
};

export const setUpdateRules = function () {
  this.setOptions({
    runValidators: true,
    returnDocument: 'after',
  });
};
