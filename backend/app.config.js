const config = {
    auth: {
      google: {
        clientId:
          process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/callback/google",
        tokenEndpoint: "https://oauth2.googleapis.com/token",
        scope: "openid",
      },
    },
  };
  
  module.exports = config;