import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface CategoryScore {
  name: string;
  score: number;
  comment: string;
}

interface FeedbackData {
  totalScore: number;
  categoryScores: CategoryScore[];
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
}

const FeedbackPage = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`/api/feedback/${id}`);
        const data = await res.json();
        if (data.success && data.feedback) {
          setFeedback(data.feedback);
        } else {
          setError("Feedback not found");
        }
      } catch (err) {
        setError("Error fetching feedback");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchFeedback();
  }, [id]);

  if (loading) return <div>Loading feedback...</div>;
  if (error) return <div>{error}</div>;
  if (!feedback) return <div>No feedback available.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-b from-[#18191d] to-[#090a0e] rounded-2xl mt-10 text-white">
      <h1 className="text-3xl font-bold mb-4">Interview Feedback</h1>
      <div className="mb-4">
        <strong>Total Score:</strong> {feedback.totalScore}
      </div>
      <div className="mb-4">
        <strong>Category Scores:</strong>
        <ul className="list-disc ml-6">
          {feedback.categoryScores.map((cat, idx) => (
            <li key={idx}>
              <strong>{cat.name}:</strong> {cat.score} - {cat.comment}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <strong>Strengths:</strong>
        <ul className="list-disc ml-6">
          {feedback.strengths.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <strong>Areas for Improvement:</strong>
        <ul className="list-disc ml-6">
          {feedback.areasForImprovement.map((a, idx) => (
            <li key={idx}>{a}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Final Assessment:</strong>
        <div className="mt-2 bg-[#23243a] p-4 rounded-xl">{feedback.finalAssessment}</div>
      </div>
    </div>
  );
};

export default FeedbackPage;