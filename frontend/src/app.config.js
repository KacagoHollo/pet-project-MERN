const _config = {
    dev: {
        organization: "http://localhost:8080/api",
        google: {
            client_id: "67666964063-cb5l4sa6m4rm42f5fo20lih02ikrj8bb.apps.googleusercontent.com",
            base_url: "https://accounts.google.com/o/oauth2/v2/auth",
        }
    },
    prod: {
        organization: process.env.REACT_APP_ORGANIZATION || "http://localhost:8080/api",
        google_client_id: process.env.REACT_APP_CLIENTID || "67666964063-cb5l4sa6m4rm42f5fo20lih02ikrj8bb.apps.googleusercontent.com",
        google_base_url: process.env.REACT_BASEURL || "https://accounts.google.com/o/oauth2/v2/auth",
    },
}

const config = process.env.NODE_ENV === "development" ? _config.dev : _config.prod;

export default config;