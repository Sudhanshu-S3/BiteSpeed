# BiteSpeed Chatbot Builder

A tool to build chatbots with a React frontend and Node.js backend.

## How to Set Up for Development

1. Copy this project to your computer
2. Install all needed packages:
 ```npm run install-all```
3. Make a `.env` file in the server folder with your MongoDB connection:
```MONGODB_URL=your_mongodb_connection_string PORT=5000 NODE_ENV=development```
4. Make a `.env` file in the client folder:
```REACT_APP_API_URL=http://localhost:5000/api```
5. Start the app in development mode:
```npm run dev```



## Features

- Drag-and-drop visual builder for creating conversation flows
- Multiple message types: text, images, quick replies, and structured data
- Folder organization for managing different chatbot projects
- Save and load conversation designs
- Test mode to validate conversation paths
- Responsive design that works on desktop and mobile devices

## Technology Stack

- **Frontend**: React.js, ReactFlow for visual editing
- **Backend**: Node.js with Express
- **Database**: MongoDB for storing chatbot configurations
- **Styling**: CSS modules with responsive design

## Ways to Deploy Your App

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

- Set `NODE_ENV=production` for optimized performance
- Configure proper MongoDB connection with authentication
- Consider setting up a free MongoDB Atlas account for database hosting
- For production, update CORS settings in server.js to allow only your frontend domain

## License
ISC

## Author
Sudhanshu Shukla




