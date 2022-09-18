exports.validationErrorToString = (validation) => {
  return Object.values(validation.errors.all()).join(', ');
};
