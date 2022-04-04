# games-front-end

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

### Lints and fixes files
```
npm run lint
```

## Testing

Run unit test in CLI: `npm run test:unit`

Standard test was created for testing API endpoint

## IP

The user IP is proxied using https://api.ipify.org since the Vue is running locally on its own server the API requests were always registering as the IP of the Vue App while testing. While this worked for developing locally there may be a scaling issue.


