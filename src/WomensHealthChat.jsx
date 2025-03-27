import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import "./styles.css"; // Import custom styles

export default function WomensHealthChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  /*

  const handleAsk = () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    setTimeout(() => {
      // Default response until the API is ready
      setAnswer("Menstruation is a natural process that occurs in females of certain mammalian species, including humans. It is caused by the shedding of the uterine lining, which is a result of a decrease in the levels of estrogen and progesterone in the body. These hormones are responsible for regulating the menstrual cycle.");
      setLoading(false);
    }, 2000);
  };
  */
  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
  
    try {
      const response = await fetch("https://19a1-34-145-90-23.ngrok-free.app/ask", {
        method: "POST",
        mode: "cors",  // Ensure CORS is enabled
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error fetching response:", error);
      setAnswer("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <motion.h1 animate={{ scale: 1.1 }}>Women's Health AI Chat</motion.h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Ask a question about women's health..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleAsk}>
          <MessageCircle size={20} /> Ask
        </button>
      </div>
      {loading && <p>Fetching answer...</p>}
      {answer && (
        <motion.div className="answer-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {answer}
        </motion.div>
      )}
    </div>
  );
}