"use client";


const getData = async () => {
  fetch('http://localhost:3000/api')
}

export default function Home() {
  return (
    <div>
      Main PAGE
      <button onClick={getData}>Scrape Guardian</button>
    </div>
  );
}
