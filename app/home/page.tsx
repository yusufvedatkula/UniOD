
"use client";

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
        <div style={{textAlign:"center"}}>
          <span className="loading loading-spinner text-info text-10xl m-10"></span>
        </div>
        
      ) : (
        <UniTable data={uniData} addFavoriteUniEnabled={true} removeFavoriteUniEnabled={false}/>
      )}
    </div>
  );
}
