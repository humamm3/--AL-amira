"use strict";

const twilio = require("twilio");

module.exports = {
  async send(ctx) {
    try {
      const { phone } = ctx.request.body;

      if (!phone) {
        return ctx.badRequest("Phone number is required");
      }

      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      const verification = await client.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verifications.create({
          to: phone,
          channel: "sms",
        });

      return {
        status: "sent",
        sid: verification.sid,
      };
    } catch (err) {
      console.error(err);
      ctx.throw(500, "Failed to send OTP");
    }
  },

  async verify(ctx) {
    try {
      const { phone, code } = ctx.request.body;

      if (!phone || !code) {
        return ctx.badRequest("Phone and code are required");
      }

      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      const check = await client.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verificationChecks.create({
          to: phone,
          code,
        });

      if (check.status === "approved") {
        return { success: true };
      } else {
        return ctx.unauthorized("Invalid code");
      }
    } catch (err) {
      console.error(err);
      ctx.throw(500, "Verification failed");
    }
  },
};