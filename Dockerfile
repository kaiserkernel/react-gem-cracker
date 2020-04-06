# DEV BUILD STEP
FROM node:12.16.1-alpine3.11 as devBuild
WORKDIR /app

# Log the settings for NPM and Environment variables
ENV NODE_ENV=production
RUN npm config ls
RUN env

# Copy the project files so docker caches dependencies
COPY package.json package-lock.json /app/
RUN ls -a
RUN npm install --production=false
# Copy the source code and build
COPY . .
RUN npm run build:prod
RUN ls -a

# PROD BUILD STEP
# Using latest LTS release of Node
FROM node:12.16.1-alpine3.11

# Create an app directory on the container
WORKDIR /app
ENV NODE_ENV=production

# Project copy build, install only prod dependencies
COPY --from=devBuild /app/dist ./dist
COPY --from=devBuild /app/.next ./.next
COPY --from=devBuild /app/public ./public
COPY --from=devBuild /app/next.config.js ./next.config.js
COPY package.json package-lock.json healthcheck.js ./

RUN ls -a

RUN npm install --only=prod

RUN npx next telemetry disable

# Expose the container port to the OS
# docker run takes -p argument to forward this port to network
EXPOSE 3000

# Start the application
CMD npm run start:prod

HEALTHCHECK --interval=30s --timeout=12s --start-period=30s \  
  CMD node /healthcheck.js
