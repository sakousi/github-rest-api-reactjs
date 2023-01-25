import { Box, Button, Grid, Text, Tooltip } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GithubContext } from "../githubContext";

const commitsActivity = (commits) => {
    let commitsActivity = [];
    let commitsActivityObj = {};
    commits.forEach(commit => {
        let date = commit.commit.author.date.slice(0, 10);
        if (commitsActivityObj[date]) {
            commitsActivityObj[date] += 1;
        } else {
            commitsActivityObj[date] = 1;
        }
    })
    for (let key in commitsActivityObj) {
        commitsActivity.push({date: key, commits: commitsActivityObj[key]});
    }
    return commitsActivity;
}

const yearCalender = (commits, querryYear) => {
    let year = new Date(querryYear).getFullYear();
    let calender = [];
    for (let i = 1; i <= 12; i++) {
        let month = i < 10 ? `0${i}` : i;
        let days = new Date(year, month, 0).getDate();
        let oneMonth = [];
        for (let j = 1; j <= days; j++) {
            let day = j < 10 ? `0${j}` : j;
            let date = `${year}-${month}-${day}`;
            let commit = commits.find(commit => commit.date === date);
            if (commit) {
                oneMonth.push({date: date, commits: commit.commits});
            } else {
                oneMonth.push({date: date, commits: 0});
            }
        }
        calender.push(
            {
                month: month,
                days: oneMonth
            }
        );
    }
    return calender;
}

const currentYear = new Date().getFullYear();

export default function Repo() {
    const githubContext = useContext(GithubContext);
    let { user, repo } = useParams();
    const [data, setData] = useState([]);
    const [year, setYear] = useState(String(currentYear));
    const [calender, setCalender] = useState([])
    const [creationDate, setCreationDate] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [commitsLoaded, setCommitsLoaded] = useState(false);
    const [commitsActivityArr, setCommitsActivityArr] = useState([]);

    useEffect(() => {
        githubContext.getRepository(user, repo).then(
            data => {
                setData(data); 
                setDataLoaded(true);
            }
        );
        githubContext.getCommits(user, repo).then(
            data => {
                setCommitsActivityArr(commitsActivity(data));
                setCreationDate(String(new Date(data[0].commit.author.date).getFullYear()));
                setCalender(yearCalender(commitsActivityArr, year))
                setCommitsLoaded(true);
            }
        );

        console.log('hello');

    }, [user, repo, githubContext]);

    if (!dataLoaded && !commitsLoaded) {
        return <Box>Loading...</Box>
    }else{
        console.log(commitsActivityArr);
        console.log(calender);
        console.log(creationDate);
        const rows= [];
        for (let i = creationDate; i <= currentYear; i++) {
            rows.push(i)
        }
        return (
            <Box>
                <Link to='/'><Button>Back to main menu</Button></Link>
                <Text as='h1' fontSize='2.5rem' >Repo name: {data.name}</Text>
                <Text as='p' fontSize='2rem' >Language: {data.language}</Text>
                <Text as='h2' fontSize='2.25rem' >Description:</Text>
                {data.description === null ? <Text as='p'>No description</Text> : <Text as='p'>{data.description}</Text>}
                <Text as='h2' fontSize='2.25rem' >Activity:</Text>
                    {rows.map(row => (
                        <Button key={row} onClick={() => {
                            setCalender(yearCalender(commitsActivityArr, String(row)))
                        }}>
                            {row}
                        </Button>
                    ))}
                <Grid templateColumns='repeat(12, 1fr)' gap="1" maxW="fit-content">
                    {calender.map(month => (
                        <Grid key={month.month} templateRows="repeat(16, 1fr)" templateColumns='repeat(2, 1fr)' gap='.5'>
                            {month.days.map(day => (
                                <Tooltip key={day.date} label={day.commits === 0 ? `No commits on ${day.date}` : `${day.commits} commits on ${day.date}`} aria-label="A tooltip">
                                    <Box className="dayBox" bg={day.commits === 0 ? 'gray.200' : 'teal.900'}></Box>
                                </Tooltip>
                            ))}
                        </Grid>
                    ))}
                </Grid>

            </Box>
        )
        }
}
