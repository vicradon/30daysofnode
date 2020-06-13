exports.successResponse = function (res, msg) {
  const data = {
    status: "success",
    message: msg,
  };
  return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
  const resData = {
    status: "success",
    message: msg,
    data: data,
  };
  return res.status(200).json(resData);
};

exports.errorResponse = function (res, msg, statusCode) {
  if (process.env.NODE_ENV === "development") {
    const data = { message: msg, status: "error" };
    if (statusCode) return res.status(statusCode).json(data);
    return res.status(500).json(data);
  } else {
    return res.status(500).json(data);
  }
};

exports.notFoundResponse = function (res, msg) {
  const data = {
    status: "error",
    message: msg,
  };
  return res.status(404).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
  const resData = {
    status: "error",
    message: msg,
    data: data,
  };
  return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
  const data = {
    status: "error",
    message: msg,
  };
  return res.status(401).json(data);
};
