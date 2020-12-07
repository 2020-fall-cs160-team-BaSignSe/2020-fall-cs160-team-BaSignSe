# Use the official image as a parent image.
FROM node:14.15.1

# Set the working directory.
WORKDIR /Users/lalitha/2020-fall-cs160-team-BaSignSe/frontend/dockerapp/

# Copy the file from your host to your current location.
COPY package.json .

# Run the command inside your image filesystem.
RUN npm install

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 80

ENV PORT 80

# Run the specified command within the container.
CMD [ "npm", "start" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

