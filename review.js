document.addEventListener('DOMContentLoaded', function() {
    // Load existing reviews from localStorage
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewList = document.getElementById('reviewList');

    reviews.forEach(review => {
        const reviewElement = createReviewElement(review);
        reviewList.appendChild(reviewElement);
    });

    document.getElementById('reviewForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Get the values from the form
        const name = document.getElementById('reviewerName').value;
        const text = document.getElementById('reviewText').value;
        const rating = document.getElementById('reviewRating').value;
        const date = new Date().toLocaleString();

        // Create a new review object
        const newReview = { name, text, rating, date };

        // Add the new review to the review list in the DOM
        const reviewElement = createReviewElement(newReview);
        reviewList.appendChild(reviewElement);

        // Add the new review to the reviews array and save to localStorage
        reviews.push(newReview);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // Clear the form
        document.getElementById('reviewForm').reset();
    });
});

function createReviewElement(review) {
    const { name, text, rating, date } = review;
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');
    reviewElement.innerHTML = `
        <div class="review-header">
            <h3>${name}</h3>
            <span>${date}</span>
        </div>
        <div class="rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
        <p>${text}</p>
    `;
    return reviewElement;
}
