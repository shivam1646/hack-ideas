# hack-ideas

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Build docker image
docker build -t shivam/hack-ideas .

### Create and start docker container and go to port 8080 on local machine
docker run -it -p 8080:8080 -d --name hack-ideas shivam/hack-ideas
