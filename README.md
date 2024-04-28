# Rentastics

<p align="center">
  <img src="https://github.com/Martin-Pashov/Rentastics/assets/80414148/c1ea58ba-3072-4d84-b965-bc9938b6661e" alt="Rentastics Logo" width="300" height="90">
</p>

## Introduction

Welcome to Rentastics! This project is a MERN (MongoDB, Express.js, React.js, Node.js) stack website designed for buying, selling, and renting real estate properties. It serves as a platform for real estate brokers to publish their listings and for users to browse and interact with those listings.

Rentastics is crafted with a user-friendly interface to provide an intuitive experience for both real estate brokers and users. Whether you're searching for your dream home or looking to showcase your property listings, Rentastics offers a seamless and efficient platform to meet your needs.

## Features

- **User Authentication**: Secure user registration and authentication system.
- **Listing Management**: Real estate brokers can create, update, and delete property listings.
- **Property Search**: Users can search for properties based on various criteria such as avalable parking, price, listing type, furnished properties, etc.
- **Favorites**: Users can save their favorite listings for quick access later.
- **Contact Integration**: Seamless integration with contact forms for users to inquire about properties.
- **Responsive Design**: The website is fully responsive, ensuring a consistent experience across all devices.
- **Interactive Maps**: Utilized Leaflet for interactive maps to visualize property locations.
- **Swipeable Carousels**: Implemented Swiper for creating swipeable carousels to showcase property images.

## Technologies Used

### MERN Stack

- **MongoDB**: Utilized MongoDB Atlas as the database for storing property information and user data.
- **Express.js**: Employed Express.js to build the backend server, handle HTTP requests, and manage routes.
- **React**: Developed the frontend using React library to create dynamic and interactive user interfaces.
- **Node.js**: Utilized Node.js for server-side scripting and running JavaScript code on the server.

### Additional Technologies

- **Firebase**: Integrated Firebase for authentication and real-time data synchronization for Google account login or register.
- **TailwindCSS**: Utilized TailwindCSS for styling and designing the user interface components.
- **Bcrypt.js**: Used Bcrypt.js for password hashing to enhance security.
- **Cookie Parser**: Implemented Cookie Parser for parsing cookies attached to the client request.
- **Dotenv**: Employed Dotenv for loading environment variables.
- **JSON Web Token (JWT)**: Implemented JWT for securely transmitting information between parties.
- **Mongoose**: Utilized Mongoose for modeling MongoDB data and interacting with the database.
- **Nodemon**: Used Nodemon for automatically restarting the server during development.
- **Redux and Redux Toolkit**: Employed Redux and Redux Toolkit for managing application state efficiently.

## Deployment

The app is hosted on Render. You can go to the website by clicking [here](https://rentastics.onrender.com/), and it's suggested to open the link using the **Mozilla Firefox browser** for the best user experience.

## Documentation

You can find the full documentation in the 'documentation for the project' directory in the repo. There are two versions of it: one as a .PDF and one as a .DOCX.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
```
git clone https://github.com/Martin-Pashov/Rentastics.git
```

2. Navigate to the project directory in the terminal:
```
cd rentastics
```

3. Install dependencies for the backend in the root directory:
```
npm install
```

4. Install dependencies for the frontend in the root directory:
```
cd client
npm install
```

5. Set up environment variables:
- Create a `.env` file in the `root` directory.
- Define the following variables:
  ```
  MONGODB_URI=your_mongodb_connection_string
  GOOGLE_MAPS_API_KEY=your_google_maps_api_key
  JWT_SECRET=your_secret_key
  ```

- Create a `.env` file in the `client` directory.
- Define the following variable:
  ```
  VITE_FIREBASE_API_KEY=your_firebase_api_key
  ```

6. Start the backend server in the root directory:
```
npm run dev
```

7. Start the frontend development server:
```
cd client
npm run dev
```

8. The application should automatcally open in your web browser. 
- If the link does not automatically open, you can manually open it by Ctrl + click-ing on the URL provided in the terminal of your code editor after starting the frontend development server. 
- An example of what will be presented in the terminal:
```
➜ Local: http://localhost:5173/
➜ Network: use --host to expose
➜ press h + enter to show help
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact me [here](mailto:martinpashov7777@gmail.com).
