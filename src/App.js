// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ArticlePage from './components/ArticlePage';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
          <header>
            <h1>News Application</h1>
          </header>
          <div className="container"></div>
       </div>   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;



/*best 3 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ArticlePreview from './components/ArticlePreview';
//import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePreview />} />
        
      </Routes>
    </Router>
  );
}

export default App;*/

