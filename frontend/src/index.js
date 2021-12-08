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
  gql,
  ApolloLink,
  HttpLink
} from "@apollo/client";
import { onError } from '@apollo/client/link/error'
import { createHttpLink } from 'apollo-link-http';
import { setContext } from '@apollo/client/link/context';

require('dotenv').config();












// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: ApolloLink.from([
//     new HttpLink({ uri: "http://localhost:4003"}),
//     onError(({ graphQLErrors, networkError }) => {
//       if (networkError) {
//         console.log(`[Network error]: ${networkError}`);
//       }
 
//       if (graphQLErrors) {
//         graphQLErrors.forEach(({ message, locations, path }) =>
//           console.log(
//             `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//           )
//         );
//       }
//     })
//   ])
// })

// Create HttpLink for Apollo
// const httpLink = createHttpLink({
//   uri: 'http://localhost:4003'
// })

// Auth for token
// const authLink = setContext((_, { headers }) => {
// 	return {
// 		headers: {
// 			...headers,
// 			// authorization: token ? `${token}` : ''
// 		}
// 	}
// })

// Initialize Apollo Client
// const client = new ApolloClient({
// 	link: authLink.concat(httpLink),
// 	cache: new InMemoryCache(),
// });

// const client = new ApolloClient({
//   uri: 'http://localhost:4003/graphql',
//   cache: new InMemoryCache()
// });

// const error = apolloError // from async try/catch, onError method, or a promise .catch
// console.log(JSON.stringify(error, null, 2));

// client
//   .query({
//     query: gql`
//       query GetRates {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

// http://172.19.0.3:4003
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
