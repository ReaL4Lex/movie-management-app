// Auto-hide flash messages after 5 seconds
document.addEventListener('DOMContentLoaded', function() {
  const alerts = document.querySelectorAll('.alert');
  
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s ease-out';
      alert.style.opacity = '0';
      setTimeout(() => {
        alert.remove();
      }, 500);
    }, 5000);
  });
});

// Form validation enhancement
const forms = document.querySelectorAll('form');

forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    // Check for required checkboxes (genres)
    const checkboxGroups = form.querySelectorAll('.checkbox-group');
    
    checkboxGroups.forEach(group => {
      const checkboxes = group.querySelectorAll('input[type="checkbox"]');
      const checked = Array.from(checkboxes).some(cb => cb.checked);
      
      if (checkboxes.length > 0 && !checked) {
        e.preventDefault();
        alert('Please select at least one genre');
      }
    });
    
    // Password confirmation validation
    const password = form.querySelector('input[name="password"]');
    const confirmPassword = form.querySelector('input[name="confirmPassword"]');
    
    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        e.preventDefault();
        alert('Passwords do not match');
        confirmPassword.focus();
      }
    }
    
    // Rating validation
    const rating = form.querySelector('input[name="rating"]');
    if (rating) {
      const ratingValue = parseFloat(rating.value);
      if (ratingValue < 0 || ratingValue > 10) {
        e.preventDefault();
        alert('Rating must be between 0 and 10');
        rating.focus();
      }
    }
  });
});

// Delete confirmation
const deleteForms = document.querySelectorAll('.delete-form');

deleteForms.forEach(form => {
  form.addEventListener('submit', function(e) {
    const confirmed = confirm('Are you sure you want to delete this movie? This action cannot be undone.');
    if (!confirmed) {
      e.preventDefault();
    }
  });
});

// Rating input helper
const ratingInputs = document.querySelectorAll('input[name="rating"]');

ratingInputs.forEach(input => {
  input.addEventListener('input', function() {
    const value = parseFloat(this.value);
    if (value < 0) this.value = 0;
    if (value > 10) this.value = 10;
  });
});

// Year input helper
const yearInputs = document.querySelectorAll('input[name="year"]');

yearInputs.forEach(input => {
  input.addEventListener('input', function() {
    const currentYear = new Date().getFullYear();
    const value = parseInt(this.value);
    if (value < 1888) this.value = 1888;
    if (value > currentYear + 5) this.value = currentYear + 5;
  });
});

// TMDB API configuration
const TMDB_API_KEY = 'c2cab522aef638e4907e0daafd0e9cec'; // TMDB API key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Search for movie images using TMDB API
async function searchMovieImage() {
  const movieName = document.getElementById('name').value.trim();
  const imageResults = document.getElementById('imageResults');

  if (!movieName) {
    alert('Please enter a movie name first');
    return;
  }

  if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY') {
    alert('Please set your TMDB API key in main.js');
    return;
  }

  try {
    // Show loading
    imageResults.innerHTML = '<p>Searching for movie posters...</p>';

    // Search for movies
    const searchResponse = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieName)}`);
    const searchData = await searchResponse.json();

    if (!searchData.results || searchData.results.length === 0) {
      imageResults.innerHTML = '<p>No movies found. Try a different search term.</p>';
      return;
    }

    // Get the first movie result
    const movie = searchData.results[0];

    // Get movie images
    const imagesResponse = await fetch(`${TMDB_BASE_URL}/movie/${movie.id}/images?api_key=${TMDB_API_KEY}`);
    const imagesData = await imagesResponse.json();

    // Display poster images
    let html = '<h4>Select a poster:</h4><div class="image-grid">';

    if (imagesData.posters && imagesData.posters.length > 0) {
      imagesData.posters.slice(0, 6).forEach(poster => {
        const imageUrl = TMDB_IMAGE_BASE_URL + poster.file_path;
        html += `
          <div class="image-option" onclick="selectImage('${imageUrl}')">
            <img src="${imageUrl}" alt="Movie poster" onerror="this.style.display='none'">
          </div>
        `;
      });
    } else {
      html += '<p>No posters available for this movie.</p>';
    }

    html += '</div>';
    imageResults.innerHTML = html;

  } catch (error) {
    console.error('Error searching for movie images:', error);
    imageResults.innerHTML = '<p>Error loading movie posters. Please check your TMDB API key and try again.</p>';
  }
}

// Select an image from the search results
function selectImage(imageUrl) {
  document.getElementById('image').value = imageUrl;

  // Clear search results
  document.getElementById('imageResults').innerHTML = '';

  // Add visual feedback
  const imageInput = document.getElementById('image');
  imageInput.style.borderColor = '#28a745';
  setTimeout(() => {
    imageInput.style.borderColor = '';
  }, 2000);
}
