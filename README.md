# Pitch Market

## Overview

Pitch Market is a platform where users can create pitches for buying and selling products. It provides a marketplace environment similar to OLX, where users can pitch their products for sale or browse pitches to find products they're interested in.

## Screenshots

![Home](https://i.postimg.cc/T3mHvLrg/pitch-market.png)

![Login](https://i.postimg.cc/jjtvV8qY/pitch-3.png)


## Tech Stack

- **Frontend**: ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

- **Backend**: ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

- **Database**: ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

- **Authentication**: ![JSON Web Tokens (JWT)](https://img.shields.io/badge/JSON_Web_Tokens-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

- **Image Storage**: ![Cloudinary](https://img.shields.io/badge/Cloudinary-4285F4?style=for-the-badge&logo=cloudinary&logoColor=white) ![Multer](https://img.shields.io/badge/Multer-FF69B4?style=for-the-badge&logo=multer&logoColor=white)

## Features

- **User Authentication**: Secure user registration and login with JWT authentication.
- **Pitch Creation**: Users can create pitches for buying or selling products.
- **Product Listings**: Browse and search for pitches to find products.
- **Admin Dashboard**: Manage pitches, users, and product listings.
- **Image Upload**: Users can upload images for their pitches, which are stored securely on Cloudinary.


## Run Locally

To run project, run the following command

### Prerequisites

    1. Install NPM packages in the following directories.


```bash
  Root Directory -- npm install
  cd frontend    -- npm install
```
    2. Set up your config.env file in the backend 
```bash
   for exmaple 

   DB_LOCAL_URI = 
   JWT_SECRET = 
   CLOUDINARY_API_KEY = 
```

     3. To run application run the following commands
```bash

   change mongo uri to your local ip in env 

   root directary -- npm start
   cd frontend    -- npm start
```
## Authors

- [@akshaymahajan01](https://github.com/akshaymahajan01)
