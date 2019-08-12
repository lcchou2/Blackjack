import React from 'react';
import logo from './logo.svg';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hand: "block",
      button: "block",
      cash: 100,
      bet:0,
      betTemp: 0,
      message: "",
      val: "",
      deck: [],
      cards: []
      // cards:[{number:2,suit:2}, {number:2,suit:2}, {number:2,suit:2},{number:2,suit:2}]
    }
    this.hideLoad = this.hideLoad.bind(this)
    this.start = this.start.bind(this)
    this.bet5 = this.bet5.bind(this)
    this.bet10 = this.bet10.bind(this)
    this.reset = this.reset.bind(this)
    this.bet20 = this.bet20.bind(this)
    this.valChange = this.valChange.bind(this)
    this.generateDeck = this.generateDeck.bind(this)
    this.generateCard = this.generateCard.bind(this)
    this.setUp = this.setUp.bind(this)
    this.dealCards = this.dealCards.bind(this)
  }

  setUp() {
    
    const deck = this.generateDeck()
    
    const {newDeck, player,dealer} = this.dealCards(deck)

    this.setState({
      deck: newDeck,
      hand: "block",
      button: "block",
      cash: 100,
      bet:0,
      betTemp: 0,
      message: "",
      val: "",
      player,
      dealer
      // cards:[{number:2,suit:2}, {number:2,suit:2}, {number:2,suit:2},{number:2,suit:2}]
    })

  }
  dealCards(deck) {
    const playerCard1 = this.generateCard(deck);
    const dealerCard1 = this.generateCard(playerCard1.newDeck);
    const playerCard2 = this.generateCard(dealerCard1.newDeck);    
    const player = [playerCard1.randomCard, playerCard2.randomCard]
    const dealer = [dealerCard1.randomCard,{}]
  
    
    return {newDeck :playerCard2.newDeck, player, dealer}
  }

  generateDeck() {
    const cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    const suits = ['♦','♣','♥','♠'];
    const deck = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < suits.length; j++) {
        deck.push({number: cards[i], suit: suits[j]});
      }
    }
    return deck
  }

  generateCard(deck){
    const newDeck = deck
    const randomNum = Math.floor(Math.random() * newDeck.length)
    const randomCard = newDeck[randomNum]
    return {randomCard, newDeck}
  }
  
  componentWillMount() {
    
    this.setUp();
    this.hideLoad()
  }

  valChange(e){
    
    this.setState({val:e.target.value});
  }
  reset(){
    this.setState({
      hand: "none",
      button: "block",
      cash: 100,
      bet:0,
      betTemp: 0,
      message: "",
      val: "",
      cards: []
    })

    this.generateCard()
  }

  hideLoad() {
    this.setState({
      hand: "none"
    })
  }

  start() {
    if (this.state.val > this.state.cash){
      this.setState({
        message: "nope nibba",
        bet: "0"
      })
    } else {
      this.setState({
        hand:"block",
        
      })
    }
    
  }


  bet5(){
    if (this.state.bet >= this.state.cash) {
      this.setState({
        message: "You don't have that much money man"
      })
      
    } else {
      this.setState({
        bet: this.state.bet + 5
      })
    }
    
  }

  bet10(){
    if (this.state.bet >= this.state.cash) {
      this.setState({
        message: "You don't have that much money man"
      })
    } else {
      this.setState({
        bet: this.state.bet + 10
      })
    }
    
  }
  bet20(){
    if (this.state.bet >= this.state.cash) {
      this.setState({
        message: "You don't have that much money man"
      })
    } else {
      this.setState({
        bet: this.state.bet + 20
      })
    }
    
  }

        


  



 

  render() {
    return (
      <div className="App">
      <button onClick = {this.reset}>New Game</button>
       <button onClick = {this.start} style = {{display:this.state.button}}>Bet</button>
       <form>
              <input type="number" name="bet" placeholder = "" value={this.state.val} onChange={this.valChange} />
      </form>
       <button onClick = {this.bet5}>$5</button>
       <button onClick = {this.bet10}>$10</button>
       <button onClick = {this.bet20}>$20</button>
       
       <div>
         
            Cash: ${this.state.cash}
            
        </div>
        <div>
        Current Bet: ${this.state.bet}
        </div>
      <div class="main">
      {this.state.message}
        <div class="table">
          
          
          <div class="boardMe" style = {{display:this.state.hand}}>
          <div class = "words">YOUR HAND 
          </div>
              <div class="card-small">
                <p>{this.state.player[0].number}</p>
                <p>{this.state.player[0].suit}</p>
              </div>
              <div class="card-small">
                <p>{this.state.player[1].number}</p>
                <p>{this.state.player[1].suit}</p>
              </div>  
            
          </div>

         

         
          
          <div className = "boardYou" style = {{display:this.state.hand}}>
          <div class = "words2">
              Dealer's hand
          </div>
            <div class="card-small">
                <p class="card-text">{this.state.dealer[0].number}</p>
                <p class="card-img ">{this.state.dealer[0].suit}</p>
              </div>
              <div class="card-small" style = {{display:'none'}}>
                <p class="card-text">{this.state.player[0].number}</p>
                <p class="card-img ">{this.state.player[0].suit}</p>
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
