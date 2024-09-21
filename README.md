# Blog API Project

## Overview

This repository contains two implementations of a blog API: one using Express and the other using NestJS. Both implementations include a JWT authentication system with token management, role-based authorization, media upload to a S3 bucket, upvote and downvote functionality for posts, comment threads on posts, posts views tracking, and management of post categories and tags.

## Features

- **JWT Authentication**: Secure authentication with token management.
- **Role-Based Access Control**: Different roles with specific permissions.
- **Media Upload**: Upload media to a S3 bucket.
- **Voting System**: Upvote and downvote posts.
- **Comment Threads**: Comment on posts and engage in discussions.
- **Posts Views Tracking**: Track and analyze posts views.
- **Post Categories**: Posts can be organized into categories for better content management and navigation.
- **Post Tags**: Posts can be tagged with relevant keywords to facilitate searching and filtering.

## Implementations

### Express

The Express implementation is located in the `express-api` directory.

### NestJS

The NestJS implementation is located in the `nestjs-api` directory.

## Installation

### Common Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/mohamed271220/Blog-API
   cd blog-api
   ```

2. Configure environment variables. Create a `.env` file in the root directory of each implementation (`express` and `nestjs`) and add the following variables:

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


### Express

1. Navigate to the Express implementation directory:

   ```bash
   cd express-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Follow the [Usage](#usage) section to run the Express server.

### NestJS

1. Navigate to the NestJS implementation directory:

   ```bash
   cd nestjs-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Follow the [Usage](#usage) section to run the NestJS server.

## Contributing

If you want to contribute to the project, please fork the repository and submit a pull request with your changes. Ensure that all tests pass before submitting your pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

