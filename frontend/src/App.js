import './App.css';
import { useRecoilState } from 'recoil';
import { websiteState } from './recoil/atoms';

function App() {
  const [website, setWebite] = useRecoilState(websiteState)
  console.log(website)

  return (
    <div className="App">
      <header className="App-header">
        <h1> Test </h1>
      </header>
    </div>
  );
}

export default App;
