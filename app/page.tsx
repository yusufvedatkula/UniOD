"use client";

import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../app/globals.css"

import { useEffect, useState } from 'react';
import { UniTable } from "@/components/UniTable";
import { uniDataStructure } from '@/constants';


export default function Home() {
  const [uniData, setUniData] = useState<uniDataStructure[]>([]);
  const [loading, setLoading] = useState<boolean>(true);



  useEffect(() => {
    const fetchUniData = async () => {
      const response = await fetch('api/getUniData');
      const data = await response.json();
      setUniData(data);
      setLoading(false);
    };

    fetchUniData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <UniTable data={uniData} />
      )}
    </div>
  );
}
