"use client"
import MagnetLines from "@/components/MagnetLines"
import BlurText from "@/components/BlurText"
import { useState } from "react";
import axios from "axios"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {

  const [data, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setResponse('')
      setLoading(true);
      console.log("Clicked")
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
    <div className=" flex flex-col justify-center items-center py-10">

      <div className="pt-10 flex flex-col ">
        <h1 className="text-2xl ">Hoever Here</h1>
        <BlurText
          text="Isn't this so cool?!"
          delay={150}
          hoverToReveal
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-7xl MY-8 font-bold"
          animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 }}
          animationTo={[
            { filter: 'blur(5px)', opacity: 1, y: 5 },
            { filter: 'blur(0px)', opacity: 1, y: 0 }
          ]}
        />
      </div>



      <MagnetLines
        rows={9}
        columns={9}
        containerSize="60vmin"
        lineColor="black"
        lineWidth="0.8vmin"
        lineHeight="5vmin"
        baseAngle={0}
        style={{ margin: "2rem auto" }}
      />

      <div className=" flex gap-4">
        <Input  placeholder="Enter"  onChange={(e) => setInput(e.target.value)} />
        <Button onClick={handleSubmit} >Submit</Button>
      </div>

      <div className="">
        {loading && <h1>loading</h1>}
      </div>

      {response && <h1 className="mt-10 text-5xl font-bold">{response}</h1>}

    </div>
  );
}
