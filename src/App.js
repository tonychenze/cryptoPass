import './App.css';
import {
  Navigation,
  Homepage,
  Crypto,
  CryptoDetails,
  Exchanges,
  News,
} from './components';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Navigation></Navigation>
      <Switch>
        <Route exact path='/'>
          <Homepage></Homepage>
        </Route>
        <Route exact path='/exchanges'>
          <Exchanges></Exchanges>
        </Route>
        <Route exact path='/cryptos'>
          <Crypto></Crypto>
        </Route>
        <Route exact path='/cryptos:coinId'>
          <CryptoDetails></CryptoDetails>
        </Route>
        <Route exact path='/news'>
          <News></News>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
