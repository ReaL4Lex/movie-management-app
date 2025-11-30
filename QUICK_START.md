# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd movie-management-app
npm install
```

### Step 2: Set Up MongoDB

**Option A: Use MongoDB Atlas (Easiest - No Installation)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Update `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/movie-management
```

**Option B: Install MongoDB Locally**

macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Windows: Download from https://www.mongodb.com/try/download/community

Linux:
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Step 3: Run the Application
```bash
npm run dev
```

Visit: **http://localhost:3000**

## 🎬 First Steps

1. **Register** - Create your account at `/register`
2. **Login** - Sign in at `/login`
3. **Add Movie** - Click "Add Movie" and fill the form
4. **Explore** - View, edit, and manage your movies!

## 📋 What You Can Do

✅ Register and login securely
✅ Add movies with details (name, description, year, genres, rating)
✅ View all movies from all users
✅ Edit your own movies
✅ Delete your own movies
✅ Browse movies by different users

## 🔧 Troubleshooting

**MongoDB Connection Error?**
- Make sure MongoDB is running
- Check your MONGODB_URI in `.env`
- See SETUP_GUIDE.md for detailed help

**Port Already in Use?**
- Change PORT in `.env` to another number (e.g., 3001)

**Need More Help?**
- Read SETUP_GUIDE.md for detailed instructions
- Check README.md for full documentation
- Review PROJECT_SUMMARY.md for project details

## 📚 Documentation

- **QUICK_START.md** (this file) - Get started fast
- **SETUP_GUIDE.md** - Detailed setup instructions
- **README.md** - Complete documentation
- **PROJECT_SUMMARY.md** - Project overview and features

## 🎯 Test the Application

Try these actions:
1. Register a new user
2. Login with your credentials
3. Add a movie (e.g., "The Matrix", 1999, Sci-Fi, 8.7)
4. View all movies
5. Edit your movie
6. Try to edit another user's movie (should be denied)
7. Delete your movie
8. Logout

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Run in development mode (auto-restart)
npm run dev

# Run in production mode
npm start

# Check if MongoDB is running (macOS)
brew services list

# View MongoDB data
mongosh
use movie-management
db.movies.find()
```

## 🌟 Features

- 🔐 Secure authentication
- 📝 Full CRUD operations
- ✅ Form validation
- 🎨 Responsive design
- 🔒 Ownership-based access control
- 💬 Flash messages
- 🚀 Ready for deployment

---

**Ready to build your movie collection? Let's go! 🎬**
