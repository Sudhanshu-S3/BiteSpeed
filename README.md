# BiteSpeed Chatbot Builder

A tool to build chatbots with a React frontend and Node.js backend.

## How to Set Up for Development

1. Copy this project to your computer
2. Install all needed packages:
   ```
   npm run install-all
   ```
3. Make a `.env` file in the server folder with your MongoDB connection:
   ```
   MONGODB_URL=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   ```
4. Make a `.env` file in the client folder:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
5. Start the app in development mode:
   ```
   npm run dev
   ```

## Ways to Deploy Your App

### Using Heroku

1. Make a Heroku account at [heroku.com](https://heroku.com)
2. Install Heroku on your computer: [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
3. Log in to Heroku:
   ```
   heroku login
   ```
4. Create your app on Heroku:
   ```
   heroku create my-app-name
   ```
5. Add your MongoDB database info:
   ```
   heroku config:set MONGODB_URL=your_mongodb_connection_string
   ```
6. Set it to production mode:
   ```
   heroku config:set NODE_ENV=production
   ```
7. Send your code to Heroku:
   ```
   git push heroku main
   ```

### Using Render

1. Make an account on [render.com](https://render.com)
2. Connect to your GitHub repository
3. Create a new Web Service and pick your repository
4. Set it up like this:
   - Build Command: `npm install && npm run heroku-postbuild`
   - Start Command: `npm start`
   - Environment Variables:
     - `MONGODB_URL`: Your MongoDB connection string
     - `NODE_ENV`: production

### Using Vercel

1. For the client part only, you can use Vercel:
   ```
   cd client
   npm install -g vercel
   vercel login
   vercel
   ```
2. For the server part, use Render or Heroku, then update the client's API URL

### Using Railway

1. Make an account on [railway.app](https://railway.app)
2. Connect to your GitHub repository
3. Create a new project from your repository
4. Add these environment variables:
   - `MONGODB_URL`: Your MongoDB connection string
   - `NODE_ENV`: production
5. Deploy your project

## Important Settings for Live App

For the server:

- `MONGODB_URL`: Where your database is located
- `NODE_ENV`: Set to "production"
- `PORT`: Which port the server runs on (often set by the hosting service)

For the client (set when building):

- `REACT_APP_API_URL`: Where your API is located

Made by Sudhanshu
License ISC
