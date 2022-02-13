module.exports = ({ env }) => ({
  url: env("MY_HEROKU_URL"),
  host: env("HOST"),
  port: env.int("PORT"),
  app: {
    keys: env.array("APP_KEYS"),
  },
});
