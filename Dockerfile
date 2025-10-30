# Dockerfile for Strapi on Fly.io
FROM node:22-alpine

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git

# Set environment to production
ENV NODE_ENV=production

# Copy the configuration files
WORKDIR /opt/
COPY ./package.json ./package-lock.json ./
ENV PATH /opt/node_modules/.bin:$PATH

# Install dependencies
RUN npm ci --only=production

# Copy the application files
WORKDIR /opt/app
COPY ./ .

# Build the Strapi application
RUN npm run build

# Expose the Strapi port
EXPOSE 1337

# Start the Strapi application
CMD ["npm", "start"]
