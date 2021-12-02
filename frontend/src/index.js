import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from 'apollo-link-http';

require('dotenv').config();

// Create HttpLink for Apollo
// const httpLink = createHttpLink({
// 	uri: 'http://localhost:4003/graphql',
// });

// // Initialize Apollo Client
// const client = new ApolloClient({
// 	// link: authLink.concat(httpLink),
//   // link: httpLink,
//   // link: httpLink,
//   uri: 'http://localhost:4003/graphql',
// 	cache: new InMemoryCache(),
// });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        {/* <ApolloProvider client={client}> */}
          <App />
        {/* </ApolloProvider> */}
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
