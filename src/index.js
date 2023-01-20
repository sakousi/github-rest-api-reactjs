import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { 
  RouterProvider,
  createBrowserRouter 
} from 'react-router-dom';

//Routes
import App from './App';
import User from './routes/User';
import Repo from './routes/Repo';

//Contexts
import GithubProvider from './githubContext';

const router = new createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/:user',
    element: <User />
  },
  {
    path: '/:user/:repo',
    element: <Repo />
  }
]);


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <GithubProvider > 
        <RouterProvider router={router} />
      </GithubProvider>
    </ChakraProvider>
  </StrictMode>
);