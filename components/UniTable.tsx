import "bootstrap/dist/css/bootstrap.min.css"; //

import { uniDataStructure } from "@/constants"

interface UniTableProps {
    data: uniDataStructure[];
  }

export const UniTable: React.FC<UniTableProps> = ({ data }) => {
    return (
        <div className="tableContainer">
            <table className="">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">UCAS Code</th>
                        <th scope="col">University</th>
                        <th scope="col">CUG rank</th>
                        <th scope="col">Guardian rank</th>
                        <th scope="col">Open Day Dates</th>
                        <th scope="col">CUG score</th>
                        <th scope="col">Guardian score</th>
                        <th scope="col">Satisfied with teaching</th>
                        <th scope="col">Career After 15 months</th>
                        <th scope="col">Student Satisfaction</th>
                        <th scope="col">Research Quality</th>
                        <th scope="col">Graduate Prospects</th>
                        <th scope="col">Website</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(uni => (
                        <tr key={uni.ucasCode}>
                            <td scope="row">{uni.ucasCode}</td>
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
                    ))}
                </tbody>
            </table>
        </div>
    )
    
}