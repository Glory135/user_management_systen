import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './componenets/Header';
import Home from './pages/Home'
import AddEdit from './pages/AddEdit'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/add' component={AddEdit} />
          <Route path='/update/:id' component={AddEdit} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
