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
    if (this instanceof TimedOut) {
      return 408;
    }
    return 500;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class TimedOut extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  TimedOut,
};

