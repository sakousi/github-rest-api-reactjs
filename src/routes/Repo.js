import { Box, Grid, Text, Tooltip } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const yearCalender = (commits) => {
    let year = new Date('2021').getFullYear();
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
        calender.push(oneMonth);
    }
    return calender;
}

export default function Repo() {
    const githubContext = useContext(GithubContext);
    let { user, repo } = useParams();
    const [data, setData] = useState([]);
    const [commits, setCommits] = useState([]);

    useEffect(() => {
        githubContext.getRepository(user, repo).then(data => setData(data));
        githubContext.getCommits(user, repo).then(data => setCommits(data));
    }, [user, repo, githubContext])

    const commitsActivityArr = commitsActivity(commits);
    const year = yearCalender(commitsActivityArr);

    console.log(commits);
    console.log(commitsActivityArr);
    console.log(year);
    return (
        <Box>
            <Text as='h1' fontSize='2.5rem' >Repo name: {data.name}</Text>
            <Text as='p' fontSize='2rem' >Language: {data.language}</Text>
            <Text as='h2' fontSize='2.25rem' >Description:</Text>
            {data.description === null ? <Text as='p'>No description</Text> : <Text as='p'>{data.description}</Text>}
            <Text as='h2' fontSize='2.25rem' >Activity:</Text>
            <Grid templateColumns='repeat(12, 1fr)' gap="1" maxW="fit-content">
                {year.map(month => (
                    <Grid templateRows="repeat(16, 1fr)" templateColumns='repeat(2, 1fr)' gap='.5'>
                        {month.map(day => (
                            <Tooltip label={day.commits === 0 ? `No commits on ${day.date}` : `${day.commits} commits on ${day.date}`} aria-label="A tooltip">
                                <Box className="dayBox" bg={day.commits === 0 ? 'gray.200' : 'teal.900'}></Box>
                            </Tooltip>
                        ))}
                    </Grid>
                ))}
            </Grid>
            
        </Box>
    )
}
