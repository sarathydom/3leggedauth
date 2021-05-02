module.exports.defaultRoute = (req, res) => {
  if (req.params.token) {
    res.send(req.params.token);
    return;
  } else {
    res.send("ok");
  }
  res.send("ok");
};
module.exports.linkedAuthUrl = (req, res) => {
  const commonutility = require("../../utility/common");
  try {
    let DefaultClass = require("../../class/routes/default.class");
    const config = require("../../config/config.json");
    let defaultClass = new DefaultClass(req, res, config);
    let Url = defaultClass.getLinkedUrl();
    commonutility.successResponse(res, "linkedin authorisation URL", Url);
  } catch (e) {
    commonutility.errorResponse(res, e);
  }
};
module.exports.linkedinCallBack = async (req, res) => {
  console.log("reqqq");
  console.log(req.query);
  let DefaultClass = require("../../class/routes/default.class");
  const config = require("../../config/config.json");
  let defaultClass = new DefaultClass(req, res, config);
  const authToken = req.query.code;
  let Url = defaultClass.getAccessTokenURL(authToken);
  const result = await defaultClass.sendRequestToGetAccessToken(Url);
  console.log(result);
  let { access_token, error, error_description } = result;
  if (error) {
    res.redirect(`/access/${error_description}`);
    return;
  }
  res.redirect(`/access/${access_token}`);
};
