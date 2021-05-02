class InitilizeServer {
  constructor(config, app, express, path, bodyParser, router) {
    this.config = config;
    this.app = app;
    this.router = router;
    this.express = express;
    this.path = path;
    this.bodyParser = bodyParser;
  }
  setMiddleware = () => {
    this.app.use(this.bodyParser.urlencoded({ extended: false }));
    this.app.use(this.bodyParser.json());
    this.app.use(this.express.static(this.path.join(__dirname, "public")));

    this.app.set("view engine", this.config.viewEngiene);
    this.app.use((req, res, next) => {
      req.title = this.config.defaultTitle;
      next();
    });
  };
  setRoutes = () => {
    Object.values(this.router).forEach((ele) => {
      this.app.use(ele);
    });
  };
  mongoDBConnect = (err) => {
    try {
      const mongoose = require("mongoose");
      const uri = this.config.MONGODBURL;
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (e) {
      console.log("error in mongodbconnection");
      err(e);
    }
  };
  setMulter = (path, extension = "") => {
    const multer = require("multer");
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `${process.cwd()}/public/${path}/`);
      },
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}.${extension}`); //Appending .jpg
      },
    });

    var upload = multer({ storage: storage });
    return upload;
  };
  runServer = () => {
    this.app.listen(this.config.PORT, () => {
      console.log(`Server running on port : ${this.config.PORT}`);
    });
  };
  runServer_https = () => {
    const https = require("https");
    https.createServer().listen(this.config.PORT, () => {
      console.log(`Server running on port : ${this.config.PORT}`);
    });
  };
  startCronJobs = () => {
    Object.values(this.cronjobs).forEach((ele) => {
      if (ele.isStart) {
        ele.job.startCron();
      } else {
        ele.job.stopCron();
      }
    });
  };
}
module.exports = InitilizeServer;
