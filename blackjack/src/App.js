import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <div class="main">
        <div class="table">
          <div class="boardMe">
            <div class="card-small">
              <p class="card-text black">A</p>
              <p class="card-img black">&clubs;</p>
            </div>
            <div class="card-small">
              <p class="card-text black">10</p>
              <p class="card-img black">&spades;</p>
            </div>
          
            
          </div>
          <div className = "boardYou">
            <div class="card-small">
                <p class="card-text red">K</p>
                <p class="card-img red">&hearts;</p>
              </div>
              <div class="card-small">
                <p class="card-text red">Q</p>
                <p class="card-img red">&diams;</p>
              </div>           
           </div>
        </div>
      </div>
    </div>
  );
}

export default App;
