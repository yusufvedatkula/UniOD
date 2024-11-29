"use client";

import { UniTable } from "@/components/UniTable";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { uniDataStructure } from "@/constants";

export default function FavoritesPage() {
    const [unis, setFavoriteUnis] = useState<uniDataStructure[]>([]);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchFavoriteUnis = async () => {
            try {
                const res = await fetch("/api/getFavoriteUnis");
                if (res.ok) {
                    const data = await res.json();
                    setFavoriteUnis(data.favorites);
                } else {
                    console.error("Failed to fetch favorites:", res.statusText);
                }
            } catch (error) {
                console.error("Error fetching favorite universities:", error);
            }
        };

        if (session?.user?.email) {
            fetchFavoriteUnis();
        }
    }, [session]);


    return (
        <div>
            <h1>Favorite Universities</h1>
            <UniTable data={unis} />
        </div>
    );
}
