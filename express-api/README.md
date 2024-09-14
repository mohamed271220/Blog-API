# Blog API

## Overview

This project is a blog API built with TypeScript. It includes a JWT authentication system with token management and a role-based authorization system. Users can upload media to an S3 bucket, upvote and downvote posts, comment on posts, and track posts views.

## Features

- **JWT Authentication**: Secure authentication with token management.
- **Role-Based Access Control**: Different roles with specific permissions.
- **Media Upload**: Upload media to an S3 bucket.
- **Voting System**: Upvote and downvote posts.
- **Comment Threads**: Comment on posts and engage in discussions.
- **Posts Views Tracking**: Track and analyze posts views.
- **Post Categories**: Posts can be organized into categories for better content management and navigation.
- **Post Tags**: Posts can be tagged with relevant keywords to facilitate searching and filtering.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mohamed271220/Blog-API
   cd blog-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables. Create a `.env` file in the root directory and add the following variables:

- `DB_NAME`: Database name.
- `DB_USER`: Database user.
- `DB_PWD`: Database password.
- `DB_HOST`: Database host.
- `JWT_SECRET`: Secret key for JWT.
- `JWT_REFRESH_SECRET`: Secret key for JWT refresh tokens.
- `REDIS_URL`: Redis connection URL.
- `REDIS_HOST`: Redis host.
- `REDIS_PORT`: Redis port.
- `AWS_ACCESS_KEY_ID`: AWS access key ID for S3.
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key for S3.
- `AWS_REGION`: AWS region for S3.
- `AWS_BUCKET_NAME`: AWS S3 bucket name.
- `PORT`: Port for the server.


## Usage

### Development

To start the development server with live reloading, run:

```bash
npm run dev
```

### Building

To build the project, run:

```bash
npm run build
```

### Running

To run the built application, use:

```bash
npm start
```

### Debugging

To start the application with debugging enabled, use:

```bash
npm run serve-debug
```

### Testing

To run tests with coverage, use:

```bash
npm test
```

### Watching

To watch files for changes and automatically restart the server, use:

```bash
npm run watch
```

## Scripts

Here is a summary of the available npm scripts:

- **build-ts**: Compiles TypeScript files.
- **build**: Builds the project.
- **debug**: Builds the project and starts it in debug mode.
- **serve-debug**: Starts the server with debugging enabled.
- **serve**: Starts the server.
- **start**: Alias for `serve`.
- **test**: Runs tests with coverage.
- **watch-node**: Starts the server with Nodemon.
- **watch-ts**: Watches TypeScript files for changes.
- **dev**: Starts the development server.
- **watch-test**: Runs tests in watch mode.
- **watch**: Runs concurrent watchers for Sass, TypeScript, and Node.

## Contributing

If you want to contribute to the project, please fork the repository and submit a pull request with your changes. Ensure that all tests pass before submitting your pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

