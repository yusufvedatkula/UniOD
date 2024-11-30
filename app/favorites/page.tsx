"use client";

import { UniTable } from "@/components/UniTable";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { uniDataStructure } from "@/constants";

export default function FavoritesPage() {
    const [unis, setFavoriteUnis] = useState<uniDataStructure[]>([]);
    const [loading, setLoading] = useState(true);
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
            } finally {
                setLoading(false);
            }
        };

        if (session?.user?.email) {
            fetchFavoriteUnis();
        } else {
            setLoading(false);
        }
    }, [session]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : session?.user?.email ? (
                <div>
                    <h1 style={{ textAlign: 'center' }}>Favorite Universities</h1>
                    <UniTable data={unis} addFavoriteUniEnabled={false} />
                </div>
                
            ) : (
                <div className="grid place-items-center m-10">
                    <h1 className="text-2xl font-bold">You have to log in to use this feature</h1>
                </div>
            )}
        </div>
    );
}
