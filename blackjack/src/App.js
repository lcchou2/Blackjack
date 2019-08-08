import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hand: "block",
      button: "block"
    }
    this.hideLoad = this.hideLoad.bind(this)
    this.start = this.start.bind(this)
  }
  componentDidMount() {
    

    this.hideLoad()
  }

  hideLoad() {
    this.setState({
      hand: "none"
    })
  }

  start() {
    this.setState({
      hand:"block",
      button:"none"
    })
  }

        


  



 

  render() {
    return (
      <div className="App">
      
      <div class="main">
        <div class="table">
          
          
          <div class="boardMe" style = {{display:this.state.hand}}>
          <div class = "words">YOUR HAND 
          </div>
            <div class="card-small">
            
              <p class="card-text black">A</p>
              <p class="card-img black">&clubs;</p>
            </div>
            <div class="card-small">
              <p class="card-text black">10</p>
              <p class="card-img black">&spades;</p>
            </div>
          
            
          </div>

          <button onClick = {this.start} style = {{display:this.state.button}}>BET</button>
          
          <div className = "boardYou" style = {{display:this.state.hand}}>
          <div class = "words2">
              Dealer's hand
          </div>
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
    )
  }
}

// function App() {
//   return (
//     <div className="App">
      
//       <div class="main">
//         <div class="table">
          
          
//           <div class="boardMe">
//           <div class = "words">YOUR HAND 
//           </div>
//             <div class="card-small">
            
//               <p class="card-text black">A</p>
//               <p class="card-img black">&clubs;</p>
//             </div>
//             <div class="card-small">
//               <p class="card-text black">10</p>
//               <p class="card-img black">&spades;</p>
//             </div>
          
            
//           </div>
          
//           <div className = "boardYou">
//           <div class = "words2">
//               Dealer's hand
//           </div>
//             <div class="card-small">
//                 <p class="card-text red">K</p>
//                 <p class="card-img red">&hearts;</p>
//               </div>
//               <div class="card-small">
//                 <p class="card-text red">Q</p>
//                 <p class="card-img red">&diams;</p>
//               </div>           
//            </div>
           
//         </div>
//       </div>
//     </div>
//   );
// }

export default App;
