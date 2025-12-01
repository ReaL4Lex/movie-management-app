# Movie Management Web Application

A full-stack movie management web application built with Express.js, Pug templates, and MongoDB. Users can register, log in, and manage a collection of movies with full CRUD functionality.

## Features

- ✅ User registration and authentication
- ✅ Secure password hashing with bcryptjs
- ✅ Session-based authentication
- ✅ Add, view, edit, and delete movies
- ✅ Movie attributes: name, description, year, genres, rating
- ✅ Ownership-based access control
- ✅ Form validation (client and server-side)
- ✅ Flash messages for user feedback
- ✅ Responsive design
- ✅ Ready for Heroku deployment

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Template Engine**: Pug
- **Authentication**: express-session, bcryptjs
- **Validation**: express-validator
- **Styling**: Custom CSS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-management-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/movie-management
SESSION_SECRET=your_secret_key_change_in_production
NODE_ENV=development
```

4. Make sure MongoDB is running locally, or update `MONGODB_URI` with your MongoDB Atlas connection string.

## Running the Application

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
movie-management-app/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── User.js             # User model
│   └── Movie.js            # Movie model
├── routes/
│   ├── index.js            # Home routes
│   ├── auth.js             # Authentication routes
│   └── movies.js           # Movie CRUD routes
├── middleware/
│   ├── auth.js             # Authentication middleware
│   ├── validation.js       # Validation middleware
│   └── errorHandler.js     # Error handling
├── views/
│   ├── layout.pug          # Base layout
│   ├── index.pug           # Home page
│   ├── register.pug        # Registration page
│   ├── login.pug           # Login page
│   ├── error.pug           # Error page
│   ├── movies/             # Movie views
│   └── partials/           # Reusable components
├── public/
│   ├── css/
│   │   └── style.css       # Styles
│   └── js/
│       └── main.js         # Client-side JavaScript
├── app.js                  # Express app configuration
├── server.js               # Server entry point
├── .env                    # Environment variables
└── package.json            # Dependencies
```

## Usage

### Register a New Account
1. Navigate to `/register`
2. Fill in username, email, and password
3. Submit the form

### Login
1. Navigate to `/login`
2. Enter your email and password
3. Submit the form

### Add a Movie
1. After logging in, click "Add Movie"
2. Fill in movie details:
   - Name
   - Description
   - Year
   - Genres (select at least one)
   - Rating (0-10)
3. Submit the form

### View Movies
- Browse all movies at `/movies`
- View your movies at `/movies/my-movies`
- Click on a movie to see full details

### Edit/Delete Movies
- Only the owner can edit or delete their movies
- Click "Edit Movie" on the movie detail page
- Click "Delete Movie" to remove (with confirmation)

## API Routes

### Authentication
- `GET /register` - Registration form
- `POST /register` - Create new user
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Movies
- `GET /movies` - List all movies
- `GET /movies/my-movies` - List user's movies
- `GET /movies/add` - Add movie form
- `POST /movies/add` - Create new movie
- `GET /movies/:id` - View movie details
- `GET /movies/:id/edit` - Edit movie form
- `PUT /movies/:id` - Update movie
- `DELETE /movies/:id` - Delete movie

## API Usage

The application provides RESTful API endpoints for managing movies and user authentication. Below are examples using curl commands. Note that some endpoints require authentication (session cookies).

### Authentication Endpoints

#### Register a New User
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=john_doe&email=john@example.com&password=securepass&confirmPassword=securepass"
```

#### Login
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=john@example.com&password=securepass" \
  -c cookies.txt
```
Save cookies to `cookies.txt` for authenticated requests.

#### Logout
```bash
curl -X GET http://localhost:3000/logout \
  -b cookies.txt
```

### Movie Endpoints

#### Get All Movies
```bash
curl -X GET http://localhost:3000/movies
```

#### Get User's Movies (Authenticated)
```bash
curl -X GET http://localhost:3000/movies/my-movies \
  -b cookies.txt
```

#### Add a New Movie (Authenticated)
```bash
curl -X POST http://localhost:3000/movies/add \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Inception&description=A mind-bending thriller&year=2010&genres=Sci-Fi,Thriller&rating=9.0" \
  -b cookies.txt
```

#### Get Movie Details
```bash
curl -X GET http://localhost:3000/movies/60d5ecb74b24c72b8c8b4567
```
Replace `60d5ecb74b24c72b8c8b4567` with actual movie ID.

#### Edit Movie (Authenticated, Owner Only)
```bash
curl -X PUT http://localhost:3000/movies/60d5ecb74b24c72b8c8b4567 \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Inception (Updated)&description=Updated description&year=2010&genres=Sci-Fi,Thriller&rating=9.5" \
  -b cookies.txt
```

#### Delete Movie (Authenticated, Owner Only)
```bash
curl -X DELETE http://localhost:3000/movies/60d5ecb74b24c72b8c8b4567 \
  -b cookies.txt
```

### Notes
- Authentication endpoints return HTML forms for GET requests and handle form submissions for POST.
- Movie endpoints requiring authentication will redirect to login if not authenticated.
- Use `-b cookies.txt` to include session cookies for authenticated requests.
- Replace `localhost:3000` with your deployed URL when using in production.
- Movie IDs are MongoDB ObjectIds (24-character hexadecimal strings).

## Deployment to Heroku

1. Create a Heroku account and install Heroku CLI

2. Login to Heroku:
```bash
heroku login
```

3. Create a new Heroku app:
```bash
heroku create your-app-name
```

4. Set up MongoDB Atlas and get connection string

5. Set environment variables:
```bash
heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
heroku config:set SESSION_SECRET="your_production_secret"
heroku config:set NODE_ENV="production"
```

6. Deploy:
```bash
git add .
git commit -m "Ready for deployment"
git push heroku main
```

7. Open your app:
```bash
heroku open
```

## Security Features

- Password hashing with bcryptjs
- Session-based authentication
- HTTP-only cookies
- Server-side input validation
- XSS protection via Pug auto-escaping
- Ownership verification for protected actions

## Contributing

Feel free to submit issues and enhancement requests!

## License

ISC
