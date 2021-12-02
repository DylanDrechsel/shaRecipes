import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from 'apollo-link-http';
import { useRecoilState } from 'recoil';
import { websiteState } from './recoil/atoms';
import LandingPage from './Pages/LandingPage/LandingPage';

// Create HttpLink for Apollo
// const httpLink = HttpLink({
// 	uri: 'http://localhost:4003/graphql',
// });

// Initialize Apollo Client
// const client = new ApolloClient({
// 	// link: authLink.concat(httpLink),
//   // link: httpLink,
//   link: ApolloLink.from([httpLink]),
// 	cache: new InMemoryCache(),
// });


function App() {
  const [website, setWebite] = useRecoilState(websiteState)

  return (
    // <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <LandingPage />
        </header>
      </div>
    // </ApolloProvider>
  );
}

export default App;
