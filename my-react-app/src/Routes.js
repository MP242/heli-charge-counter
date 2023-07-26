import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './composants/Home.js';

function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
    </BrowserRouter>
  );
}
