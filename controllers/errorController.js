exports.triggerError = (req, res, next) => {
    const error = new Error('Intentional 500 error triggered!');
    error.status = 500;
    next(error); // Pass to the error handler middleware
};
  