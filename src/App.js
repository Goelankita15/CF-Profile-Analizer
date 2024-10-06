import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import ProblemRecommendation from './components/Problem Reccommend/ProblemRec';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route exact path="/" element={<About/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/recommend" element={<ProblemRecommendation/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
