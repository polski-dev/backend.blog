module.exports = ({ env }) => ({
  url: env("MY_HEROKU_URL"),
  host: env("HOST"),
  port: env.int("PORT"),
});
