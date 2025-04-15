# Build the React app with Vite
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app for production
RUN npm run build

# Serve the built app with a lightweight Node server
FROM node:18-alpine AS final

WORKDIR /app

# Copy only the build folder
COPY --from=build /app/dist ./dist

# Install static file server (serve)
RUN npm install -g serve

# Expose the port
EXPOSE 5173

# Run the app
CMD ["serve", "-s", "dist", "-l", "5173"]