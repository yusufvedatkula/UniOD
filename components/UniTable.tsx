import { useState } from 'react';
import { uniDataStructure } from "@/constants"
import { useSession } from 'next-auth/react';

interface UniTableProps {
    data: uniDataStructure[];
    addFavoriteUniEnabled: boolean;
    removeFavoriteUniEnabled: boolean;
  }

export const UniTable: React.FC<UniTableProps> = ({ data, addFavoriteUniEnabled, removeFavoriteUniEnabled }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [favoriteUni, setFavoriteUni] = useState('');
    const [uniToRemove, setUniToRemove] = useState('')

    const {data: session} = useSession()

    function handleSearch() {
        if (searchQuery == "") {
            setFilteredData(data)
        }else {
            const results = data.filter(uni => 
                uni.uniName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(results);
        }
    };

    const addFavorite = async () => {
        if (favoriteUni) {
            const university = favoriteUni;
             await fetch('/api/addFavoriteUni', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ university }),
            });
            setFavoriteUni('');
        }
    };

    const RemoveFavoriteUni = async () => {
        if (uniToRemove) {
            const res = await fetch('api/removeFavoriteUni', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uniToRemove }),
            })
            if (res.ok) {
                window.location.reload();
                setUniToRemove('')
            } else {
                console.error('Failed to add university to favorites');
            }

        }
    }

    return (
        <div style={{ margin: '3rem', textAlign: 'center', borderRadius:"1rem"}} >
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div style={{marginBottom: '1rem', marginTop:"1rem"}} className=''>
                        <input type="text" className="input input-bordered text-base-content" 
                        placeholder="Search by University Name" value={searchQuery}
                        style={{ marginRight: '1rem', width: '300px' }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    <button style={{marginBottom: '0.6rem', marginTop:"0.6rem"}} 
                    onClick={handleSearch} 
                    className='btn btn-neutral bg-white
                     text-black hover:bg-neutral 
                     hover:text-slate-100'>
                        Search
                    </button>
                </div>
            </div>

            {addFavoriteUniEnabled && session && (
                <div style={{ display: '', marginBottom: '1rem', marginLeft: '1rem'}}>
                    <input
                        type="text"
                        placeholder="Add to Favorites"
                        className='input input-bordered'
                        value={favoriteUni}
                        onChange={(e) => setFavoriteUni(e.target.value)}
                        style={{ marginRight: '1rem', width: '300px' }}
                    />
                    <button onClick={addFavorite} className='btn btn-neutral bg-white text-black hover:bg-neutral hover:text-slate-100'>Add</button>
                </div>
            )}

            {removeFavoriteUniEnabled && session && (
                 <div style={{ display: '', marginBottom: '1rem', marginLeft: '1rem'}}>
                 <input
                     type="text"
                     placeholder="Remove from Favorites"
                     className='input input-bordered'
                     value={uniToRemove}
                     onChange={(e) => setUniToRemove(e.target.value)}
                     style={{ marginRight: '1rem', width: '300px' }}
                 />
                 <button onClick={RemoveFavoriteUni} className='btn btn-error'>Remove</button>
             </div>
            )}
            

            <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '60vh' }}>
                <table className="table" 
                style={{ width: '100%', borderRadius: '0.5rem' }}>
                    <thead>
                        <tr>
                            <th className='text-xl text-base-content'>UCAS Code</th>
                            <th className='text-xl text-base-content'>University</th>
                            <th className='text-xl text-base-content'>CUG rank</th>
                            <th className='text-xl text-base-content'>Guardian rank</th>
                            <th className='text-xl text-base-content'>Open Day Dates</th>
                            <th className='text-xl text-base-content'>CUG score</th>
                            <th className='text-xl text-base-content'>Guardian score</th>
                            <th className='text-xl text-base-content'>Satisfied with teaching</th>
                            <th className='text-xl text-base-content'>Career After 15 months</th>
                            <th className='text-xl text-base-content'>Student Satisfaction</th>
                            <th className='text-xl text-base-content'>Research Quality</th>
                            <th className='text-xl text-base-content'> Graduate Prospects</th>
                            <th className='text-xl text-base-content'>Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map(uni => (
                                <tr key={uni.uniName}>
                                    <td className='text-base-content'>{uni.ucasCode}</td>
                                    <td className='text-base-content'>{uni.uniName}</td>
                                    <td className='text-base-content'>{uni.CompleteUniversityGuideData?.rank}</td>
                                    <td className='text-base-content'>{uni.guardianData?.rank}</td>
                                    <td className='text-base-content'>{uni.openDayDate}</td>
                                    <td className='text-base-content'>{uni.CompleteUniversityGuideData?.score}</td>
                                    <td className='text-base-content'>{uni.guardianData?.score}</td>
                                    <td className='text-base-content'>{uni.guardianData?.satisfiedWithTeaching}</td>
                                    <td className='text-base-content'>{uni.guardianData?.careerAfter15Months}</td>
                                    <td className='text-base-content'>{uni.CompleteUniversityGuideData?.studentSatisfaction}</td>
                                    <td className='text-base-content'>{uni.CompleteUniversityGuideData?.researchQuailty}</td>
                                    <td className='text-base-content'>{uni.CompleteUniversityGuideData?.graduateProspects}</td>
                                    <td className='text-base-content'><a href={uni.website || undefined}>{uni.website}</a></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={12} style={{ textAlign: 'center' }}>No results found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}