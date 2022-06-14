# POLSLSKI.DEV ( BLOG BACK END - API )

[DEMO](https://www.polski.dev).

# Description

It is project for all progrramer wich want create their blog, but not know how promotion their blog. The project do focus all blogs all programer in one pleace . This project use :

- AWS
- Strapi.js
- REST API: Node.js + PostgreSQL ( [repositorie API ](https://github.com/polski-dev/backend.blog). )

# How to run this project?

1. Download this project on your computer
2. Make sure you have node.js installed [Link to Node.js ](https://nodejs.org) and database MongoDB
3. After making sure that you have installed node.js, run the terminal and in the directory of this project run the command `yarn install`
4. Create `.env` in main and add parametr:

# SERVER

- `PORT=1337`
- `HOST=0.0.0.0`
- `JWT_SECRET=xxxxxxxxxxxxxxxxxxxxx`
- `API_TOKEN_SALT=xxxxxxxxxxxxxxxxxxxxx`
- `ADMIN_JWT_SECRET=xxxxxxxxxxxxxxxxxxxxx`
- `APP_KEYS=['xxxxxxxxxxxxxxxxxxxxx','xxxxxxxxxxxxxxxxxxxxx','xxxxxxxxxxxxxxxxxxxxx']`

# DB

- `DATABASE_URL=xxxxxxxxxxxxxxxxxxxxx`

# AWS

- `AWS_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxxxxx`
- `AWS_ACCESS_SECRET=xxxxxxxxxxxxxxxxxxxxx`
- `AWS_REGION=xxxxxxxxxxxxxxxxxxxxx`
- `AWS_BUCKET=xxxxxxxxxxxxxxxxxxxxx`

# SENDGIRD

- `SENDGRID_API_KEY=xxxxxxxxxxxxxxxxxxxxx`

5. Then select one of the options:

### `yarn develop`

Runs the app in the development mode.\
Open [http://localhost:1337/admin](http://localhost:1337/admin) to view it in the browser.

### `yarn start`

Builds the app for production.
It correctly bundles Strapi in production mode and optimizes the build for the best performance.

## Learn More

Thanks for your interest and I invite you to cooperation :)
