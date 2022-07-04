const config = {
    auth: {
      google: {
        clientId:
          process.env.GOOGLE_CLIENT_ID || "67666964063-cb5l4sa6m4rm42f5fo20lih02ikrj8bb.apps.googleusercontent.com",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
        redirectUri: process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/callback/google",
        tokenEndpoint: "https://oauth2.googleapis.com/token",
        scope: "openid",
      },
    },
  };
  
  module.exports = config;