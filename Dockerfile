FROM node:10.15

LABEL achooan "88soldieron@gmail.com"

# Create app directory
WORKDIR /usr/src/app

# Copy package.json to workdir
COPY package*.json ./

# Install dependencies for production
RUN npm install --only=production

# Copy source to workdir
COPY . .

EXPOSE 9091
CMD ["npm", "start"]
