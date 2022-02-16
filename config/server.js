module.exports = ({ env }) => ({
  url: env("MY_HEROKU_URL" || "http://localhost:1337/"),
  host: env("HOST"),
  port: env.int("PORT" || "1337"),
  app: {
    keys: env.array("APP_KEYS"),
  },
});
