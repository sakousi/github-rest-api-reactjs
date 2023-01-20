import React, { useState } from 'react';
import {
  Box,
  Grid,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { useNavigate } from 'react-router-dom';


function App() {
  let navigate = useNavigate();

  const [user, setUser] = useState('');

  const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]{1,25}$/igm;
  const usernameRegex = /^[a-zA-Z0-9_-]{1,25}$/igm;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (user === '') {
      alert('Please enter a username or URL');
    } else if(githubRegex.test(user)) {
      console.log('Github URL detected');
      let username = user.split('/').pop();
      navigate(`/${username}`)
    } else if (usernameRegex.test(user)) {
      console.log('Github username detected');
      navigate(`/${user}`)
      } else {
      alert('Please enter a valid username or URL');
    }
  }

  return (
      <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Box width={500} justifySelf="center">
            <form onSubmit={
              e => {
                handleSubmit(e);
            }}>
              <FormControl>
                <FormLabel>Enter github Username or URL:</FormLabel>
                <Input value={user} onChange={e => setUser(e.target.value)}/>
              </FormControl>
              <Button
                mt={4}
                colorScheme='teal'
                type='submit'
              >
                Submit
              </Button>
            </form>
            </Box>
          </Grid>
      </Box>
  );
}

export default App;
