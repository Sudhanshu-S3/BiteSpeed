# Use the latest LTS version of Node.js
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm run install-all

# Copy the rest of the application
COPY . .

# Build the client
RUN npm run heroku-postbuild

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]