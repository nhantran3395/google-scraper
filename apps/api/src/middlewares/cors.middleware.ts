// @ts-ignore
import cors, { type CorsOptions } from "cors";

import { configs } from "configs";

const whitelist = configs.CORS_WHITELIST;

const options: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export default cors(options);
