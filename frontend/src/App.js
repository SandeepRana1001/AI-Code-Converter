import { Switch, Route } from 'react-router-dom/cjs/react-router-dom';
import './App.css';
import Header from './components/master/header/header';
import Home from './pages/home';
import Download from './pages/download';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/download/:language'>
          <Download />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
