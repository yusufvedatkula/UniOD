export const NAV_LINKS = [
    { href: '/', key: 'home', label: 'Home' },
    { href: '/OpenDayReminderSystem', key: 'open_day_reminder', label: 'Open Day Reminder' },
    { href: '/favorites', key: 'favourites', label: 'Favorites' },
    { href: '/myAccount', key: 'my_account', label: 'My Account' },
];

export interface guardianDataStructure {
    rank: number;
    uniName: string;
    score: number;
    satisfiedWithTeaching: number;
    averageEntryTariff: number;
    careerAfter15Months: number;
}

export interface ucasCodeDataStructure {
    uniName: string;
    ucasCode: string;
}

export const websites = {
    ucasCodeURL: 'https://en.wikipedia.org/wiki/List_of_UCAS_institutions',
    completeUniversityGuideURL: 'https://www.thecompleteuniversityguide.co.uk/league-tables/rankings',
    OpenDaysURL: 'https://www.studentcrowd.com/page/university-open-days',
    guardian: "https://www.theguardian.com/education/ng-interactive/2023/sep/09/the-guardian-university-guide-2024-the-rankings"
};


export interface CompleteUniversityGuideDataStructure {
    rank: number;
    uniName: string;
    score: number;
    studentSatisfaction: number;
    researchQuailty: number;
    graduateProspects: number;

}

export interface OpenDayDatesDataStructure {
    uniName: string;
    openDayDate: string;
    website: string;
}

export interface uniDataStructure {
    uniName: string;
    guardianData: {
        rank: number | null;
        score: number | null;
        satisfiedWithTeaching: number | null;
        careerAfter15Months: number | null;
    } | null;
    CompleteUniversityGuideData: {
        rank: number | null;
        score: number | null;
        studentSatisfaction: number | null;
        researchQuailty: number | null;
        graduateProspects: number | null;
    } | null;
    openDayDate: string | null;
    ucasCode: string | null;
    website: string | null;
}

export const ValidUniversities = [
    "University of Cambridge",
    "University of Oxford",
    "London School of Economics and Political Science",
    "University of St Andrews",
    "Imperial College London",
    "Loughborough University",
    "Durham University",
    "University of Bath",
    "UCL (University College London)",
    "University of Warwick",
    "Lancaster University",
    "University of Surrey",
    "University of Birmingham",
    "University of Exeter",
    "The University of Edinburgh",
    "University of Bristol",
    "University of York",
    "University of Sheffield",
    "University of Liverpool",
    "University of Southampton",
    "University of East Anglia (UEA)",
    "University of Manchester",
    "University of Leeds",
    "King's College London",
    "Queen's University Belfast",
    "Newcastle University",
    "Cardiff University",
    "University of Glasgow",
    "University of the Arts London",
    "University of Nottingham",
    "University of Essex",
    "University of Strathclyde",
    "Harper Adams University",
    "Northumbria University, Newcastle",
    "University of Reading",
    "University of Leicester",
    "Swansea University",
    "Royal Holloway, University of London",
    "Aston University, Birmingham",
    "City, University of London",
    "University of Aberdeen",
    "Ulster University",
    "Aberystwyth University",
    "Heriot-Watt University",
    "Nottingham Trent University",
    "Oxford Brookes University",
    "University of Sussex",
    "University of Lincoln",
    "University of Portsmouth",
    "Queen Mary University of London",
    "University of Dundee",
    "University of Kent",
    "University of Stirling",
    "Edge Hill University",
    "Bournemouth University",
    "University of Chester",
    "Manchester Metropolitan University",
    "University of Suffolk",
    "University of West London",
    "Goldsmiths, University of London",
    "Keele University",
    "Cardiff Metropolitan University",
    "Sheffield Hallam University",
    "Falmouth University",
    "University of Plymouth",
    "University of Huddersfield",
    "Coventry University",
    "Bangor University",
    "St George's, University of London",
    "University of Brighton",
    "SOAS University of London",
    "St Mary's University, Twickenham",
    "University of Hull",
    "University of Salford",
    "Glasgow Caledonian University",
    "Leeds Beckett University",
    "University of Sunderland",
    "University of Chichester",
    "Brunel University London",
    "Liverpool John Moores University",
    "Norwich University of the Arts",
    "Liverpool Hope University",
    "University of Hertfordshire",
    "University for the Creative Arts",
    "Edinburgh Napier University",
    "University of Central Lancashire",
    "University of Worcester",
    "University of Gloucestershire",
    "Kingston University",
    "Robert Gordon University",
    "Birmingham City University",
    "University of Roehampton",
    "Arts University Bournemouth",
    "University of Derby",
    "University of South Wales",
    "Queen Margaret University, Edinburgh",
    "University of Staffordshire",
    "Abertay University",
    "Teesside University",
    "York St John University",
    "Southampton Solent University",
    "University of Winchester",
    "Bath Spa University",
    "De Montfort University",
    "Buckinghamshire New University",
    "University of Bradford",
    "University of Bolton",
    "Canterbury Christ Church University",
    "University of Greenwich",
    "University of Wolverhampton",
    "Leeds Arts University",
    "Middlesex University",
    "London South Bank University",
    "Plymouth Marjon University",
    "Leeds Trinity University",
    "University of Westminster",
    "Royal Agricultural University",
    "University of Northampton",
    "Anglia Ruskin University",
    "Bishop Grosseteste University",
    "University of Cumbria",
    "Birmingham Newman University",
    "University of East London",
    "University of Buckingham",
    "London Metropolitan University"
  ];
  

  