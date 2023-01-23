import { Box, Button, Card, CardBody, CardFooter, CardHeader, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { GithubContext } from "../githubContext";


export default function User(){
    const githubContext = useContext(GithubContext);
    let { user } = useParams();
    console.log(user);
    console.log(encodeURIComponent('GitHub Octocat in:readme user:defunkt'))
    const [data, setData] = useState([]);
    const [repos, setRepos] = useState([]);
    useEffect(() => {
        githubContext.querryUser(user).then(data => setData(data));
        githubContext.getRepositories(user).then(data => setRepos(data));
    }, [user, githubContext])

    console.log(repos);
    return (
    <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Box width="75%" minH="100vh" justifySelf='center' display='flex' flexDirection="column" justifyContent="flex-start">
                <Box display='flex' flexWrap='wrap'>
                    <Box>
                        <Image w='auto' h='100%' minW='fit-content' boxSize="150px" borderRadius="full" src={data.avatar_url} alt={data.login} />
                        <Heading as='h1' size="xl">{data.login}</Heading>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between" p="5" align="start">
                        <Text size="md">Bio: {data.bio}</Text>
                        <Text size="md">Location: {data.location}</Text>
                        <Text size="md">Email: {data.email}</Text>
                        <Text size="md">Twitter: {data.twitter_username}</Text>
                        <Text size="md">Company: {data.company}</Text>
                        <Text size="md">Blog: {data.blog}</Text>
                    </Box>
                </Box>
                <Grid templateColumns='repeat(2, 1fr)' gap="5"
                    sx={{
                      '@media (max-width: 768px)': {
                        gridTemplateColumns: 'repeat(1, 1fr)',
                      },
                    }}
                >
                    {repos.map(repo => {
                        return (
                            <Card key={repo.id} align='flex-start' w="100%">
                                <CardHeader>
                                    <Heading size='md'>Repo Name: {repo.name}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text as='s' size="md">{repo.description}</Text>
                                    <Text as='h2' size="md">Repo Language: {repo.language}</Text>
                                </CardBody>
                                <CardFooter>
                                    <Link to={`/${user}/${repo.name}`}><Button>View here</Button></Link>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </Grid>
            </Box>
        </Grid>
      </Box>

    )
}