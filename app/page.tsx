"use client"
import MagnetLines from "@/components/MagnetLines"
import BlurText from "@/components/BlurText"
import { useState } from "react";
import axios from "axios"

export default function Home() {

  const [data, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const output = await axios.post('api/gemini', {
        prompt: data
      })

      console.log(output.data.response);
      setResponse(output.data.response);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };
  return (
    <div className=" flex flex-col justify-center items-center">

      <BlurText
        text="Isn't this so cool?!"
        delay={150}
        hoverToReveal
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="text-2xl mb-8"
        animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 }}
        animationTo={[
          { filter: 'blur(5px)', opacity: 1, y: 5 },
          { filter: 'blur(0px)', opacity: 1, y: 0 }
        ]}
      />


      <MagnetLines
        rows={9}
        columns={9}
        containerSize="60vmin"
        lineColor="tomato"
        lineWidth="0.8vmin"
        lineHeight="5vmin"
        baseAngle={0}
        style={{ margin: "2rem auto" }}
      />

      <div className=" flex gap-4">
        <input className="bg-black text-white" type="text" placeholder="Enter" onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="">
        {loading && <h1>loading</h1>}
      </div>

      { response &&  <h1>{response}</h1>}

    </div>
  );
}
