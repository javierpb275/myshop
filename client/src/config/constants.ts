export const API_BASE_URL =
  process.env.API_BASE_URL || "http://localhost:5000/api";

export const API_URL = {
  USERS: {
    SIGNUP: {
      URL: "/users/signup",
      METHOD: "POST",
    },
    SIGNIN: {
      URL: "/users/signin",
      METHOD: "POST",
    },
    SIGNOUT: {
      URL: "/users/signout",
      METHOD: "POST",
    },
    REFRESH_TOKEN: {
      URL: "/users/refresh",
      METHOD: "POST",
    },
    ME: {
      GET: {
        URL: "/users/me",
        METHOD: "GET",
      },
      DELETE: {
        URL: "/users/me",
        METHOD: "DELETE",
      },
    },
  },
};
