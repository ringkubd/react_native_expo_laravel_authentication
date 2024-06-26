# React Native Expo with Laravel Sanctum Authentication

This is a demo project illustrating how to integrate authentication between a React Native app built with Expo and a Laravel backend.

## Features

- **User Login:** Users can log in using their registered email and password.
- **Authentication Middleware:** Protects routes from unauthorized access.
- **Token-based Authentication:** Uses santum token for authentication.
- **Redux-tollkit:** Uses redux-tollkit for api.

## Requirements

- Node.js
- Expo CLI
- Laravel
- Composer
- MySQL or other database server

## Installation

### Frontend (React Native with Expo)

1. Clone this repository:

   ```bash
   git clone https://github.com/ringkubd/react_native_expo_laravel_authentication

2. Go to app direcoty:

    ```bash
    cd app

3. Install packages (use yarn or npm):

    ```bash
    npm i

4. Create .env file inside app folder.

   ```bash
   touch .env

5. Put your backend URL

    ```bash
    EXPO_PUBLIC_API_URL=http://192.168.20.231:8000/api

![Alt text](/img/Screenshot_1714972958.png?raw=true "Login Screen")
![Alt text](/img/Screenshot_1714973391.png?raw=true "Home Page")

1. Finally run:

    ```bash
    npx expo start

### Backend (Laravel 11)

1. Go to backend direcoty:

    ```bash
    cd backend

2. Install packages:

    ```bash
    composer install

3. Finally run (Replace (192.168.20.231) by your local ip):

    ```bash
    php artisan server --host 192.168.20.231
