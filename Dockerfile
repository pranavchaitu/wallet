FROM node:20.12.0-alpine3.19
 
WORKDIR /usr/src/app
 
# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./
 
# Copy the user-app package.json
COPY apps/user-app/package.json ./apps/user-app/package.json
 
RUN npm install
RUN cd packages/db && npx prisma generate && cd ../..

# Copy app source
COPY . .
 
RUN npm run build

CMD ["npm", "run", "start-user-app"]