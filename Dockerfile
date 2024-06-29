# set arg varible to be used in builder
FROM repo.cchnl.hnl:5000/node:18.16.0-bullseye AS builder

# You can only set ARG after from
# Setting the build version - this is used for passing arg from cicd pipe
ARG build_env

# Create app directory
WORKDIR /usr/src/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# set npm registry to use repo
RUN npm config set registry https://repo.cchnl.hnl/repository/npm-all/

# set npm to ignore self signed cert ssl 
RUN npm config set strict-ssl false

# run npm install
RUN npm install

# Bundle app source
COPY . .

RUN npm run build-${build_env}

# copy files from build and create nginx server hosting the copy files
FROM repo.cchnl.hnl:5000/nginx-kerb:1.15.11-alpine

# setting arg project name to copy from builder image
ARG project_name

# copy nginx conf
COPY nginx.conf /etc/nginx/nginx.conf

# copy angular dist folder
COPY --from=builder /usr/src/dist/www /var/www

# open port for nginx
EXPOSE 80 443

STOPSIGNAL SIGTERM

CMD ["nginx"]
