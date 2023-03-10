import { createContext } from "react";

const secret = require('./private.json');

export const GithubContext = createContext(null);

export default function GithubProvider(props) {
  return (
    <GithubContext.Provider 
    value={{
        querryUser: API.querryUser,
        getRepositories: API.getRepositories,
        getRepository: API.getRepository,
        getCommits: API.getCommits
    }}>
      {props.children}
    </GithubContext.Provider>
  );
}


const API = {
    querryUser: async (user) => {
      let header = {
        method: 'GET',
        headers: {
          'Authorization': secret.secret
        }
      };
      const response = await fetch(`https://api.github.com/users/${user}`, header);
      const data = await response.json();
      return data;
    },
    getRepositories: async (user) => {
      let header = {
        'Authorization': secret.secret
      };
      const response = await fetch(`https://api.github.com/users/${user}/repos`, header);
      const data = await response.json();
      return data;
    },
    getRepository: async (user, repo) => {
      let header = {
        'Authorization': secret.secret
      };
      const response = await fetch(`https://api.github.com/repos/${user}/${repo}`, header);
      const data = await response.json();
      return data;
    },
    getCommits: async (user, repo) => {
      let header = {
        'Authorization' : secret.secret
      };
      const response = await fetch(`https://api.github.com/repos/${user}/${repo}/commits`, header);
      const data = await response.json();
      return data;
    }
}