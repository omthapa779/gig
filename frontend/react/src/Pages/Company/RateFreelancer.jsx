import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";

export default function RateFreelancer() {
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = "Rate Freelancer | GiG";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!review.trim() || review.trim().length < 10) {
      setError("Please provide a review of at least 10 characters");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      console.log("Rating submitted:", {
        freelancerId: "freelancer123",
        rating: Math.round(rating),
        review: review.trim(),
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/company/jobs");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <div className="rating-page w-full max-w-4xl mx-auto">
      <div className="rating-card bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 sm:px-8 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Rate Freelancer</h1>
          <p className="text-blue-100">Share your experience working with this freelancer</p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-8 flex items-center">
              <i className="fa-solid fa-check-circle mr-3 text-lg"></i>
              <span>Rating submitted successfully! Redirecting...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8 flex items-center">
              <i className="fa-solid fa-circle-exclamation mr-3 text-lg"></i>
              <span>{error}</span>
            </div>
          )}

          {/* Freelancer Info */}
          <div className="rating-panel mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/100"
                alt="John Developer"
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">John Developer</h2>
                <p className="text-gray-600 text-sm">john.dev@example.com</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap sm:flex-nowrap">
                  <div className="flex text-sm sm:text-base text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa-star ${i < 4 ? "fa-solid" : "fa-regular"}`}
                      ></i>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                    4.5 (12 reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Overall Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 items-center flex-wrap sm:flex-nowrap">
                <div className="flex gap-2 sm:gap-3 text-2xl sm:text-4xl cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <i
                        className={`fa-star ${
                          star <= (hoverRating || rating) ? "fa-solid text-yellow-400" : "fa-regular text-gray-300"
                        }`}
                      ></i>
                    </button>
                  ))}
                </div>
                <span className="text-sm sm:text-lg font-semibold text-gray-700 whitespace-nowrap">
                  {hoverRating || rating} out of 5
                </span>
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="review" className="block text-sm font-semibold text-gray-900 mb-3">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience with this freelancer. Be specific about their work quality, communication, reliability, and professionalism..."
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {review.length}/500 characters (minimum 10 required)
              </p>
            </div>

            {/* Rating Criteria */}
            <div className="rating-panel rating-guidelines bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3">Rating Criteria:</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-600 mt-0.5"></i>
                  <span>Work Quality: How well did they complete the project?</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-600 mt-0.5"></i>
                  <span>Communication: How responsive and clear were they?</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-600 mt-0.5"></i>
                  <span>Reliability: Did they meet deadlines and expectations?</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-600 mt-0.5"></i>
                  <span>Professionalism: How professional were they throughout?</span>
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-spinner animate-spin"></i>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-paper-plane"></i>
                    Submit Rating
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/company/jobs")}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </SmoothScroll>
  );
}
