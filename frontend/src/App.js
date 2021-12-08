import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { useRecoilState } from 'recoil';
import { websiteState } from './recoil/atoms';
import LandingPage from './Pages/LandingPage/LandingPage';

const errorLink = onError(({ graphqlErrors, networkErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql Error ${message}`)
    })
  }
})

const link = from([
  errorLink, 
  new HttpLink({
    uri: 'http://localhost:4003/graphql'
  })
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  const [website, setWebite] = useRecoilState(websiteState)

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <LandingPage />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
