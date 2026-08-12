
import { useState, useEffect } from "react";
import ThoughtInput from "../../components/ThoughtInput/thoughtInput";
import "./Home.css";

const Home = () => {
  const [thought, setThought] = useState("");
  const [diary, setDiary] = useState<string | null> (null);

  useEffect(() => {
    const loadDiary = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/diary/loadDiary");

            const result = await response.json();

            setDiary(result.data);
            
        } catch (err) {
            console.log("error while loading the diary : ", err);
            
        }
    };
    loadDiary();
  }, []);

  const handleSubmit = async() => {
    if (!thought.trim()) return;

    console.log("Thought:", thought);
    // send it to backend
    try {
        const response = await fetch("http://localhost:3001/api/diary/write", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                thought: thought,
        }),
        });

        if(!response.ok){
            throw new Error("Failed to save thought");
        }

        const data = await response.json();
        console.log("saved", data);
        setDiary(prev => (prev ? prev + "\n": "")+ thought);
        setThought("");
    } catch (err) {
        console.error("err:", err)
    }
    // Later:
    // Send thought to your backend / AI service here.
  };

  return (
  <main className="home">
    <div className="content">
      {diary ? (
        <p>{diary}</p>
      ) : (
        <p>What's on your mind bbg</p>
      )}

      <ThoughtInput
        value={thought}
        onChange={setThought}
        onSubmit={handleSubmit}
      />
    </div>
  </main>
);
};

export default Home;

