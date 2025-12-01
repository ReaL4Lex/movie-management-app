# Setup Guide - Movie Management App

This guide will help you set up and run the Movie Management Application.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option below

## MongoDB Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended for beginners)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" on your cluster
5. Choose "Connect your application"
6. Copy the connection string
7. Update your `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/movie-management?retryWrites=true&w=majority
```
Replace `username` and `password` with your database credentials.

### Option 2: Local MongoDB Installation

#### macOS (using Homebrew):
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Your connection string in .env:
MONGODB_URI=mongodb://localhost:27017/movie-management
```

#### Windows:
1. Download MongoDB from [official website](https://www.mongodb.com/try/download/community)
2. Run the installer
3. MongoDB will start automatically as a service
4. Use this connection string in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/movie-management
```

#### Linux (Ubuntu/Debian):
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Your connection string in .env:
MONGODB_URI=mongodb://localhost:27017/movie-management
```

## Application Setup

1. **Clone or download the project**
```bash
cd movie-management-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory (if not exists):
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/movie-management
SESSION_SECRET=your_secret_key_change_in_production
NODE_ENV=development
```

**Important**: Change `SESSION_SECRET` to a random string for security.

4. **Start the application**

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

5. **Access the application**

Open your browser and navigate to:
```
http://localhost:3000
```

## Troubleshooting

### MongoDB Connection Error

**Error**: `Error: connect ECONNREFUSED`

**Solutions**:
- Make sure MongoDB is running:
  - macOS: `brew services list` (should show mongodb-community as started)
  - Windows: Check Services app for MongoDB service
  - Linux: `sudo systemctl status mongod`
  
- If using local MongoDB, verify it's running on port 27017
- If using MongoDB Atlas, check your connection string and network access settings

### Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**: 
- Change the PORT in `.env` file to another port (e.g., 3001, 8080)
- Or stop the process using port 3000

### Module Not Found Errors

**Error**: `Cannot find module 'express'` or similar

**Solution**:
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

## First Time Usage

1. **Register a new account**
   - Go to http://localhost:3000/register
   - Fill in username, email, and password
   - Click "Register"

2. **Login**
   - Go to http://localhost:3000/login
   - Enter your email and password
   - Click "Login"

3. **Add your first movie**
   - Click "Add Movie" in the navigation
   - Fill in movie details
   - Click "Add Movie"

4. **Explore features**
   - View all movies
   - View your movies
   - Edit/Delete your movies
   - Browse movies from other users

## Testing the Application

### Manual Testing Checklist

- [ ] Register a new user
- [ ] Login with the new user
- [ ] Add a new movie
- [ ] View all movies
- [ ] View movie details
- [ ] Edit your movie
- [ ] Delete your movie
- [ ] Try to edit another user's movie (should be denied)
- [ ] Logout
- [ ] Try to access protected routes without login (should redirect)

## Development Tips

### Viewing Database Content

**Using MongoDB Compass** (GUI):
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your connection string
3. Browse collections: `users` and `movies`

**Using MongoDB Shell**:
```bash
# Connect to MongoDB
mongosh

# Switch to database
use movie-management

# View users
db.users.find()

# View movies
db.movies.find()
```

### Resetting the Database

To start fresh:
```bash
mongosh
use movie-management
db.dropDatabase()
```

## Production Deployment to Heroku

### Prerequisites
- Heroku account (free tier available)
- Heroku CLI installed
- MongoDB Atlas account (for production database)

### Step-by-Step Heroku Deployment

1. **Install Heroku CLI** (if not already installed):
   ```bash
   # macOS with Homebrew
   brew tap heroku/brew && brew install heroku

   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli

   # Linux
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create a new Heroku app**:
   ```bash
   heroku create your-movie-app-name
   ```
   Replace `your-movie-app-name` with a unique name for your app.

4. **Set up MongoDB Atlas for production**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster (M0 free tier is fine)
   - Create a database user
   - Whitelist IP addresses (add `0.0.0.0/0` for all IPs)
   - Get your connection string

5. **Configure environment variables**:
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
   heroku config:set SESSION_SECRET="your_production_secret_key_here"
   heroku config:set NODE_ENV="production"
   ```

6. **Deploy your application**:
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push heroku main
   ```

7. **Open your deployed app**:
   ```bash
   heroku open
   ```

### Post-Deployment Configuration

1. **Scale your dyno** (if needed):
   ```bash
   heroku ps:scale web=1
   ```

2. **View logs** (for troubleshooting):
   ```bash
   heroku logs --tail
   ```

3. **Update environment variables** (if needed):
   ```bash
   heroku config:set VARIABLE_NAME="value"
   ```

### Heroku-Specific Notes

- **Procfile**: The `Procfile` in your project root tells Heroku how to run your app
- **Port**: Heroku assigns a random port via the `PORT` environment variable (handled in `server.js`)
- **Sessions**: Session store is configured to work with Heroku's ephemeral filesystem
- **Static Files**: Served efficiently by Express.js static middleware

### Troubleshooting Heroku Deployment

**App crashes on startup**:
- Check logs: `heroku logs --tail`
- Verify MongoDB Atlas connection string
- Ensure all dependencies are in `package.json`

**Database connection fails**:
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check database user credentials
- Ensure cluster is running

**Environment variables not set**:
- Use `heroku config` to list current variables
- Set missing variables with `heroku config:set`

### Cost Optimization

- **Free Tier**: Heroku provides 550 free dyno hours/month
- **Database**: MongoDB Atlas M0 cluster is free (512MB storage)
- **Scaling**: Only scale when needed to control costs

### Maintenance

**Update your app**:
```bash
git add .
git commit -m "Update message"
git push heroku main
```

**Backup database**: Use MongoDB Atlas backup features

**Monitor usage**: Check Heroku dashboard for dyno hours and MongoDB Atlas for database usage

## Need Help?

- Check the [README.md](README.md) for more information
- Review error messages in the terminal
- Check MongoDB connection status
- Verify all environment variables are set correctly

## Common Environment Variables

```env
# Server Configuration
PORT=3000                                    # Port number for the server
NODE_ENV=development                         # Environment (development/production)

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/movie-management  # MongoDB connection string

# Session Configuration
SESSION_SECRET=your_random_secret_key_here   # Secret for session encryption (change this!)

# For Production (Heroku)
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/movie-management
# SESSION_SECRET=production_secret_key
# NODE_ENV=production
```

## Success!

If everything is set up correctly, you should see:
```
Server is running on port 3000
Visit: http://localhost:3000
MongoDB Connected: localhost
```

Happy coding! 🎬
