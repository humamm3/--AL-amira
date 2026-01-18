"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/otp/send",
      handler: "otp.send",
    },
    {
      method: "POST",
      path: "/otp/verify",
      handler: "otp.verify",
    },
  ],
};