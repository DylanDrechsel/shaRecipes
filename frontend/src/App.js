import './App.css';
import { useRecoilState } from 'recoil';
import { websiteState } from './recoil/atoms';
import LandingPage from './Pages/LandingPage/LandingPage';

function App() {
  const [website, setWebite] = useRecoilState(websiteState)

  return (
    <div className="App">
      <header className="App-header">
        <LandingPage />
      </header>
    </div>
  );
}

export default App;
