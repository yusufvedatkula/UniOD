import { useState } from 'react';
import { uniDataStructure } from "@/constants"

interface UniTableProps {
    data: uniDataStructure[];
  }

export const UniTable: React.FC<UniTableProps> = ({ data }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = () => {
        const results = data.filter(uni => 
            uni.uniName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(results);
    };

    return (
        <div style={{ margin: '3rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Search by University Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginRight: '1rem', padding: '0.75rem', borderRadius: '0.5rem', width: '500px' }}
                />
                <button onClick={handleSearch} style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: "InfoBackground"}}>Search</button>
            </div>
            <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '60vh' }}>
                <table className="table table-hover table-bordered border-dark thead-dark bg-slate-200" 
                style={{ width: '100%', borderRadius: '0.5rem' }}>
                    <thead className="table-dark">
                        <tr>
                            <th>University</th>
                            <th>CUG rank</th>
                            <th>Guardian rank</th>
                            <th>Open Day Dates</th>
                            <th>CUG score</th>
                            <th>Guardian score</th>
                            <th>Satisfied with teaching</th>
                            <th>Career After 15 months</th>
                            <th>Student Satisfaction</th>
                            <th>Research Quality</th>
                            <th>Graduate Prospects</th>
                            <th>Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map(uni => (
                                <tr key={uni.uniName}>
                                    <td>{uni.uniName}</td>
                                    <td>{uni.CompleteUniversityGuideData?.rank}</td>
                                    <td>{uni.guardianData?.rank}</td>
                                    <td>{uni.openDayDate}</td>
                                    <td>{uni.CompleteUniversityGuideData?.score}</td>
                                    <td>{uni.guardianData?.score}</td>
                                    <td>{uni.guardianData?.satisfiedWithTeaching}</td>
                                    <td>{uni.guardianData?.careerAfter15Months}</td>
                                    <td>{uni.CompleteUniversityGuideData?.studentSatisfaction}</td>
                                    <td>{uni.CompleteUniversityGuideData?.researchQuailty}</td>
                                    <td>{uni.CompleteUniversityGuideData?.graduateProspects}</td>
                                    <td><a href={uni.website || undefined}>{uni.website}</a></td>
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