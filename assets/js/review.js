let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('reviewerName').value;
    const text = document.getElementById('reviewText').value;
    const rating = document.getElementById('reviewRating').value;
    const submitButton = document.querySelector('#reviewForm button[type="submit"]');

    if (submitButton.textContent === 'Update Review') {
        const id = parseInt(submitButton.getAttribute('data-id'));
        updateReview(id, name, text, rating);
    } else {
        const review = { id: Date.now(), name, text, rating };
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    displayReviews();
    this.reset();
    submitButton.textContent = 'Submit Review';
    submitButton.removeAttribute('data-id');
});

function displayReviews() {
    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = '';

    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.setAttribute('data-id', review.id);
        reviewItem.innerHTML = `
            <h3>${review.name}</h3>
            <p>${review.text}</p>
            <div>${renderStars(review.rating)}</div>
            <button onclick="editReview(${review.id})">Edit</button>
            <button onclick="deleteReview(${review.id})">Delete</button>
        `;
        reviewList.appendChild(reviewItem);
    });
}

function renderStars(rating) {
    const maxStars = 5;
    let stars = '';

    for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
            stars += '<i class="bi bi-star-fill star-rating" style="color: yellow;" ></i>';
        } else {
            stars += '<i class="bi bi-star star-rating" style="color: yellow;"></i>';
        }
    }

    return stars;
}

function editReview(id) {
    const review = reviews.find(r => r.id === id);
    if (!review) {
        alert('Review not found');
        return;
    }

    document.getElementById('reviewerName').value = review.name;
    document.getElementById('reviewText').value = review.text;
    document.getElementById('reviewRating').value = review.rating;

    const submitButton = document.querySelector('#reviewForm button[type="submit"]');
    submitButton.textContent = 'Update Review';
    submitButton.setAttribute('data-id', id);
}

function updateReview(id, name, text, rating) {
    const review = reviews.find(r => r.id === id);
    if (!review) {
        alert('Review not found');
        return;
    }

    review.name = name;
    review.text = text;
    review.rating = rating;

    localStorage.setItem('reviews', JSON.stringify(reviews));
    displayReviews();
}

function deleteReview(id) {
    reviews = reviews.filter(r => r.id !== id);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    displayReviews();
}

function clearReviews() {
    localStorage.removeItem('reviews');
    reviews = [];
    displayReviews();
}

displayReviews();