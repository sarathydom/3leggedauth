module.exports.generateUniqNamebasedDate = (name) => {
  let date = new Date();
  return `${name}_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}_${date
    .getTime()
    .toString(16)}`;
};
module.exports.fullpath = (pathArr) => {
  const path = require("path");
  let finalPath = path.join(process.cwd(), "public", ...pathArr);
  return finalPath;
};
module.exports.errorResponse = (res, e) => {
  res.status(400);
  let error =
    e instanceof Error
      ? "unknown Error"
      : typeof e === "string"
      ? e
      : "unknown Error";
  console.log(error);
  res.send(error);
};
module.exports.successResponse = (res, message, data) => {
  res.status(200);
  let successObj = {
    success: true,
    message: message,
    data: data,
  };

  res.send(successObj);
};
module.exports.provideURL = () => {
  let config = require("../config/config.json");
  console.log(process.env.CLERISYENV);
  if (process.env.CLERISYENV === "test") return config.TESTURL;
  else return `http://localhost:${config.PORT}`;
};
