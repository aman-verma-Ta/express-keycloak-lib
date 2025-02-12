# Use a minimal Node.js runtime image
FROM node:18-alpine
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
# Install production dependencies
RUN npm ci --only=production
# Copy application source code
COPY . .
# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
# Expose the application port
EXPOSE 3000
# Start the application
CMD ["node", "src/app.js"]