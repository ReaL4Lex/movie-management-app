# Testing Checklist - Movie Management App

Use this checklist to thoroughly test all features of the application.

## ✅ Pre-Testing Setup

- [ ] MongoDB is running
- [ ] Application is running (`npm run dev`)
- [ ] Browser is open at http://localhost:3000
- [ ] No console errors in terminal

---

## 🔐 Authentication Testing

### Registration Tests

- [ ] **Valid Registration**
  - Navigate to `/register`
  - Enter valid username (3+ chars)
  - Enter valid email
  - Enter password (6+ chars)
  - Confirm password matches
  - Submit form
  - ✅ Expected: Success message, redirect to login

- [ ] **Invalid Registration - Short Username**
  - Enter username with < 3 characters
  - ✅ Expected: Error message displayed

- [ ] **Invalid Registration - Invalid Email**
  - Enter invalid email format
  - ✅ Expected: Error message displayed

- [ ] **Invalid Registration - Short Password**
  - Enter password with < 6 characters
  - ✅ Expected: Error message displayed

- [ ] **Invalid Registration - Password Mismatch**
  - Enter different passwords in password and confirm fields
  - ✅ Expected: Error message displayed

- [ ] **Invalid Registration - Duplicate Email**
  - Register with same email twice
  - ✅ Expected: Error message about existing user

### Login Tests

- [ ] **Valid Login**
  - Navigate to `/login`
  - Enter registered email
  - Enter correct password
  - Submit form
  - ✅ Expected: Success message, redirect to movies page

- [ ] **Invalid Login - Wrong Password**
  - Enter correct email
  - Enter wrong password
  - ✅ Expected: Error message

- [ ] **Invalid Login - Non-existent Email**
  - Enter email that doesn't exist
  - ✅ Expected: Error message

- [ ] **Invalid Login - Empty Fields**
  - Leave fields empty
  - ✅ Expected: Validation error

### Logout Tests

- [ ] **Logout**
  - Click logout button in navigation
  - ✅ Expected: Redirect to home page, session destroyed

---

## 🎬 Movie CRUD Testing

### Create Movie Tests

- [ ] **Access Add Movie (Not Logged In)**
  - Navigate to `/movies/add` without login
  - ✅ Expected: Redirect to login page with message

- [ ] **Access Add Movie (Logged In)**
  - Login first
  - Navigate to `/movies/add`
  - ✅ Expected: Form displayed

- [ ] **Valid Movie Creation**
  - Fill in name: "The Matrix"
  - Fill in description: "A computer hacker learns about the true nature of reality"
  - Fill in year: 1999
  - Select genres: Sci-Fi, Action
  - Fill in rating: 8.7
  - Submit form
  - ✅ Expected: Success message, movie created, redirect to movies list

- [ ] **Invalid Movie - Missing Name**
  - Leave name empty
  - Fill other fields
  - ✅ Expected: Validation error

- [ ] **Invalid Movie - Short Description**
  - Enter description < 10 characters
  - ✅ Expected: Validation error

- [ ] **Invalid Movie - Invalid Year**
  - Enter year < 1888 or > current year + 5
  - ✅ Expected: Validation error

- [ ] **Invalid Movie - No Genres**
  - Don't select any genre
  - ✅ Expected: Validation error

- [ ] **Invalid Movie - Invalid Rating**
  - Enter rating < 0 or > 10
  - ✅ Expected: Validation error

### Read Movie Tests

- [ ] **View All Movies**
  - Navigate to `/movies`
  - ✅ Expected: List of all movies displayed

- [ ] **View My Movies (Not Logged In)**
  - Navigate to `/movies/my-movies` without login
  - ✅ Expected: Redirect to login

- [ ] **View My Movies (Logged In)**
  - Login and navigate to `/movies/my-movies`
  - ✅ Expected: Only user's movies displayed

- [ ] **View Single Movie Details**
  - Click on a movie from the list
  - ✅ Expected: Full movie details displayed
  - ✅ Expected: Owner information shown
  - ✅ Expected: Edit/Delete buttons only if owner

- [ ] **View Empty Movie List**
  - Create new user with no movies
  - Navigate to `/movies/my-movies`
  - ✅ Expected: "No movies found" message

### Update Movie Tests

- [ ] **Access Edit (Not Owner)**
  - Try to access `/movies/:id/edit` for another user's movie
  - ✅ Expected: Error message, redirect

- [ ] **Access Edit (Owner)**
  - Navigate to own movie's edit page
  - ✅ Expected: Form displayed with pre-filled data

- [ ] **Valid Movie Update**
  - Change movie name
  - Change description
  - Update year
  - Change genres
  - Update rating
  - Submit form
  - ✅ Expected: Success message, movie updated

- [ ] **Invalid Movie Update**
  - Try to submit with invalid data
  - ✅ Expected: Validation errors displayed

### Delete Movie Tests

- [ ] **Delete Own Movie**
  - Click delete button on own movie
  - ✅ Expected: Confirmation dialog appears
  - Confirm deletion
  - ✅ Expected: Movie deleted, success message

- [ ] **Cancel Delete**
  - Click delete button
  - Cancel in confirmation dialog
  - ✅ Expected: Movie not deleted

- [ ] **Delete Another User's Movie**
  - Try to delete another user's movie via URL
  - ✅ Expected: Error message, redirect

---

## 🔒 Authorization Testing

### Protected Routes

- [ ] **Access /movies/add (Not Logged In)**
  - ✅ Expected: Redirect to login

- [ ] **Access /movies/my-movies (Not Logged In)**
  - ✅ Expected: Redirect to login

- [ ] **Access /movies/:id/edit (Not Logged In)**
  - ✅ Expected: Redirect to login

- [ ] **Access /movies/:id/edit (Not Owner)**
  - ✅ Expected: Error message, redirect

- [ ] **Delete Movie (Not Owner)**
  - ✅ Expected: Error message, redirect

### Guest Routes

- [ ] **Access /register (Logged In)**
  - ✅ Expected: Redirect to movies page

- [ ] **Access /login (Logged In)**
  - ✅ Expected: Redirect to movies page

---

## 🎨 UI/UX Testing

### Navigation

- [ ] **Navigation Links (Not Logged In)**
  - ✅ Expected: Home, All Movies, Login, Register visible

- [ ] **Navigation Links (Logged In)**
  - ✅ Expected: Home, All Movies, My Movies, Add Movie, Logout visible

- [ ] **Navigation Links Work**
  - Click each link
  - ✅ Expected: Correct page loads

### Flash Messages

- [ ] **Success Messages Display**
  - Perform successful action
  - ✅ Expected: Green success message appears

- [ ] **Error Messages Display**
  - Perform invalid action
  - ✅ Expected: Red error message appears

- [ ] **Messages Auto-Hide**
  - Wait 5 seconds after message appears
  - ✅ Expected: Message fades out and disappears

### Forms

- [ ] **Form Validation (Client-Side)**
  - Try to submit empty required fields
  - ✅ Expected: Browser validation prevents submission

- [ ] **Form Validation (Server-Side)**
  - Submit invalid data
  - ✅ Expected: Server returns errors, displayed on page

- [ ] **Form Data Persistence**
  - Submit invalid form
  - ✅ Expected: Valid data is preserved in form

### Responsive Design

- [ ] **Desktop View (1200px+)**
  - ✅ Expected: Full layout, multi-column grid

- [ ] **Tablet View (768px-1199px)**
  - ✅ Expected: Adjusted layout, readable

- [ ] **Mobile View (<768px)**
  - ✅ Expected: Single column, stacked navigation

---

## 🔍 Edge Cases Testing

- [ ] **Very Long Movie Name**
  - Enter 200 character name
  - ✅ Expected: Accepted (max 200)

- [ ] **Very Long Description**
  - Enter 1000 character description
  - ✅ Expected: Accepted (max 1000)

- [ ] **Multiple Genres**
  - Select all available genres
  - ✅ Expected: All genres saved and displayed

- [ ] **Decimal Rating**
  - Enter rating like 8.5
  - ✅ Expected: Accepted and displayed correctly

- [ ] **Special Characters in Input**
  - Enter special characters in fields
  - ✅ Expected: Properly escaped and displayed

- [ ] **SQL Injection Attempt**
  - Try SQL injection in forms
  - ✅ Expected: Treated as regular text, no security issue

- [ ] **XSS Attempt**
  - Try to inject `<script>alert('XSS')</script>`
  - ✅ Expected: Escaped and displayed as text

---

## 🌐 Browser Testing

Test in multiple browsers:

- [ ] **Chrome/Chromium**
  - All features work correctly

- [ ] **Firefox**
  - All features work correctly

- [ ] **Safari**
  - All features work correctly

- [ ] **Edge**
  - All features work correctly

---

## 📊 Database Testing

- [ ] **User Created in Database**
  - Register user
  - Check MongoDB: `db.users.find()`
  - ✅ Expected: User document exists with hashed password

- [ ] **Movie Created in Database**
  - Add movie
  - Check MongoDB: `db.movies.find()`
  - ✅ Expected: Movie document exists with owner reference

- [ ] **Movie Updated in Database**
  - Edit movie
  - Check MongoDB
  - ✅ Expected: Movie document updated, updatedAt changed

- [ ] **Movie Deleted from Database**
  - Delete movie
  - Check MongoDB
  - ✅ Expected: Movie document removed

---

## 🚀 Performance Testing

- [ ] **Page Load Time**
  - ✅ Expected: Pages load in < 2 seconds

- [ ] **Multiple Movies Display**
  - Create 20+ movies
  - ✅ Expected: List loads quickly, no lag

- [ ] **Form Submission Speed**
  - ✅ Expected: Forms submit and respond quickly

---

## 🔐 Security Testing

- [ ] **Password Hashing**
  - Check database
  - ✅ Expected: Passwords are hashed, not plain text

- [ ] **Session Security**
  - Check cookies
  - ✅ Expected: httpOnly flag set

- [ ] **Authorization Bypass Attempt**
  - Try to access protected routes via URL manipulation
  - ✅ Expected: Properly blocked

- [ ] **CSRF Protection**
  - Forms use POST/PUT/DELETE appropriately
  - ✅ Expected: No GET requests for data modification

---

## 📱 Accessibility Testing

- [ ] **Keyboard Navigation**
  - Navigate using Tab key
  - ✅ Expected: All interactive elements accessible

- [ ] **Form Labels**
  - Check all form inputs have labels
  - ✅ Expected: All inputs properly labeled

- [ ] **Color Contrast**
  - Check text readability
  - ✅ Expected: Sufficient contrast for readability

---

## 🐛 Error Handling Testing

- [ ] **404 Error**
  - Navigate to non-existent route
  - ✅ Expected: 404 error page displayed

- [ ] **500 Error**
  - Cause server error (if possible)
  - ✅ Expected: Error page displayed, not crash

- [ ] **Database Connection Error**
  - Stop MongoDB
  - Try to use app
  - ✅ Expected: Graceful error message

---

## ✅ Final Checklist

- [ ] All authentication features work
- [ ] All CRUD operations work
- [ ] All validations work
- [ ] All authorization checks work
- [ ] UI is responsive
- [ ] Flash messages work
- [ ] No console errors
- [ ] No security vulnerabilities
- [ ] Database operations correct
- [ ] Ready for deployment

---

## 📝 Test Results

**Date Tested**: _______________

**Tested By**: _______________

**Browser(s)**: _______________

**MongoDB Version**: _______________

**Node Version**: _______________

**Issues Found**: 

1. _______________
2. _______________
3. _______________

**Overall Status**: ⬜ PASS  ⬜ FAIL

**Notes**:
_______________________________________________
_______________________________________________
_______________________________________________

---

**Testing Complete! 🎉**
