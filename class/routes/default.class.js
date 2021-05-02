class Default_Class {
  constructor(req, res, config) {
    this.req = req;
    this.res = res;
    this.config = config;
  }
  getLinkedUrl = () => {
    let url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${this.config.LINKEDINCLIENTID}&redirect_uri=${this.config.LINKEDINCALLBACKURL}&state=DCEeFWf45A53sdfKef424&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
    return url;
  };
  getAccessTokenURL = (authToken) => {
    const redirectURI = "http://localhost:3000/linkedinCallBack";
    return `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${authToken}&redirect_uri=${this.config.LINKEDINCALLBACKURL}&client_id=${this.config.LINKEDINCLIENTID}&client_secret=${this.config.LINKEDINSECRET}`;
  };
  sendRequestToGetAccessToken = (url) => {
    const fetch = require("node-fetch");
    return fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }).then((res) => res.json());
  };
}

module.exports = Default_Class;
