import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Review.css";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("fetch(`${import.meta.env.VITE_API_URL}/reviews`)")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, []);

  const average =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="reviews-page">
      <div className="reviews-hero">
        <div>
          <span className="reviews-badge">Patient Feedback</span>

          <h1>
            Trusted by <span>Patients</span>
          </h1>

          <p>
            Real experiences from people using StayHealthy every day.
          </p>
        </div>

        <button
          className="add-review-btn"
          onClick={() => navigate("/add-review")}
        >
          ✍️ Write a Review
        </button>
      </div>

      <div className="reviews-stats">
        <div className="stat-card">
          <h2>{average}</h2>
          <p>Average Rating</p>
        </div>

        <div className="stat-card">
          <h2>{reviews.length}</h2>
          <p>Total Reviews</p>
        </div>

        <div className="stat-card">
          <h2>98%</h2>
          <p>Satisfaction</p>
        </div>
      </div>

      <div className="reviews-grid">
        {reviews.map((r) => (
          <div key={r._id} className="review-card">
            <div className="review-top">
              <div className="review-avatar">
                {r.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3>{r.name}</h3>
                <span>{r.date}</span>
              </div>
            </div>

            <div className="review-rating">
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </div>

            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;