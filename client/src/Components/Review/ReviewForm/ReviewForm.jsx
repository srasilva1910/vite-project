import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReviewForm.css";

const ReviewForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !comment || rating === 0) {
      alert("Complete all fields");
      return;
    }

    const newReview = {
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    };

try {
     await fetch("http://localhost:8181/reviews", {
       method: "POST",
        headers: {
         "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
        
        })
          
        setSuccess(true);

        setTimeout(() => {
      navigate("/reviewspage");
    }, 1500)   ;

    
    } catch (error) {
      console.error(error);
      alert("Error submitting review");
    }
  };

  return (
    <div className="review-form-container">
      <form className="review-form" onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>

      {success && <p className="success-msg">✅ Review submitted!</p>}

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="star-input">
        {[...Array(5)].map((_, index) => {
          const value = index + 1;

          return (
            <span
              key={index}
              className={value <= rating ? "active" : ""}
              onClick={() => setRating(value)}
            >
              ★
            </span>
          );
        })}
      </div>

      <textarea
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="submit">Submit Review</button>
    </form>
  </div>
    

  );
};

export default ReviewForm;