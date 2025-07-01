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
uction mode:
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
   - Build Command: `npm run install-all && npm run heroku-postbuild`
   - Start Command: `npm start`
   - Environment Variables:
     - `MONGODB_URL`: Your MongoDB connection string
     - `NODE_ENV`: production
     - `PORT`: 5000

Alternatively, you can use the Blueprint deployment method:

1. Push the `render.yaml` file to your repository
2. In Render dashboard, click on "Blueprint" and select your repository
3. Follow the prompts to deploy all services defined in the blueprint
4. After deployment, go to the Environment settings and add your `MONGODB_URL`


## Important Settings for Live App

## License
ISC

## Author
Sudhanshu Shukla




