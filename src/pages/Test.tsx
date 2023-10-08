import React, { useRef, useState } from "react";

function Test() {
  const [outText, setOutText] = useState<string>("");
  const top = useRef<HTMLInputElement | null>(null);
  const bot = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOutText((top.current?.value ?? "") + " " + (bot.current?.value ?? ""));
        }}
      >
        <input type="text" ref={top} />
        <input type="text" ref={bot} />
        <button type="submit">Submit</button>
      </form>
      {outText}
    </div>
  );
}

export default Test;
