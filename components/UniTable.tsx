import { useState } from 'react';
import { uniDataStructure } from "@/constants"
import { useSession } from 'next-auth/react';

interface UniTableProps {
    data: uniDataStructure[];
    addFavoriteUniEnabled: boolean;
  }

export const UniTable: React.FC<UniTableProps> = ({ data, addFavoriteUniEnabled }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [favoriteUni, setFavoriteUni] = useState('');

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

    return (
        <div style={{ margin: '3rem', textAlign: 'center', borderRadius:"1rem"}} >
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div style={{marginBottom: '1rem', marginTop:"1rem"}} className=''>
                        <input type="text" className="input input-bordered text-slate-100" 
                        placeholder="Search by University Name" value={searchQuery}
                        style={{ marginRight: '1rem', width: '300px' }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    <button style={{marginBottom: '0.6rem', marginTop:"0.6rem"}} onClick={handleSearch} className='btn btn-neutral bg-white text-black hover:bg-neutral hover:text-slate-100'>Search</button>
                </div>
            </div>

            {addFavoriteUniEnabled && session && (
                <div style={{ display: '', marginBottom: '1rem', marginLeft: '1rem'}}>
                    <input
                        type="text"
                        placeholder="Add to Favorites"
                        className='input '
                        value={favoriteUni}
                        onChange={(e) => setFavoriteUni(e.target.value)}
                        style={{ marginRight: '1rem', width: '200px' }}
                    />
                    <button onClick={addFavorite} className='btn btn-neutral bg-white text-black hover:bg-neutral hover:text-slate-100'>Add</button>
                </div>
            )}

            <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '60vh' }}>
                <table className="table" 
                style={{ width: '100%', borderRadius: '0.5rem' }}>
                    <thead>
                        <tr>
                            <th className='text-xl text-slate-50'>University</th>
                            <th className='text-xl text-slate-50'>CUG rank</th>
                            <th className='text-xl text-slate-50'>Guardian rank</th>
                            <th className='text-xl text-slate-50'>Open Day Dates</th>
                            <th className='text-xl text-slate-50'>CUG score</th>
                            <th className='text-xl text-slate-50'>Guardian score</th>
                            <th className='text-xl text-slate-50'>Satisfied with teaching</th>
                            <th className='text-xl text-slate-50'>Career After 15 months</th>
                            <th className='text-xl text-slate-50'>Student Satisfaction</th>
                            <th className='text-xl text-slate-50'>Research Quality</th>
                            <th className='text-xl text-slate-50'> Graduate Prospects</th>
                            <th className='text-xl text-slate-50'>Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map(uni => (
                                <tr key={uni.uniName}>
                                    <td className='text-slate-200'>{uni.uniName}</td>
                                    <td className='text-slate-200'>{uni.CompleteUniversityGuideData?.rank}</td>
                                    <td className='text-slate-200'>{uni.guardianData?.rank}</td>
                                    <td className='text-slate-200'>{uni.openDayDate}</td>
                                    <td className='text-slate-200'>{uni.CompleteUniversityGuideData?.score}</td>
                                    <td className='text-slate-200'>{uni.guardianData?.score}</td>
                                    <td className='text-slate-200'>{uni.guardianData?.satisfiedWithTeaching}</td>
                                    <td className='text-slate-200'>{uni.guardianData?.careerAfter15Months}</td>
                                    <td className='text-slate-200'>{uni.CompleteUniversityGuideData?.studentSatisfaction}</td>
                                    <td className='text-slate-200'>{uni.CompleteUniversityGuideData?.researchQuailty}</td>
                                    <td className='text-slate-200'>{uni.CompleteUniversityGuideData?.graduateProspects}</td>
                                    <td className='text-slate-200'><a href={uni.website || undefined}>{uni.website}</a></td>
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