class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  get code() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
};

const handleError = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.code).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    message: err.message,
  });
};

module.exports = handleError;
