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
    
    this.start = this.start.bind(this)
    this.bet5 = this.bet5.bind(this)
    this.bet10 = this.bet10.bind(this)
    this.bet20 = this.bet20.bind(this)
    this.valChange = this.valChange.bind(this)
    this.generateDeck = this.generateDeck.bind(this)
    this.generateCard = this.generateCard.bind(this)
    this.setUp = this.setUp.bind(this)
    this.dealCards = this.dealCards.bind(this)
    this.generateCount = this.generateCount.bind(this)
    this.playerHit = this.playerHit.bind(this)
    this.playStand = this.playStand.bind(this)
    this.checkBJ = this.checkBJ.bind(this)
    this.win = this.win.bind(this)
    this.lose = this.lose.bind(this)
    this.bjwin = this.bjwin.bind(this)
    this.draw = this.draw.bind(this)
    this.double = this.double.bind(this)
  }

  double() {
    this.setState({
      bet: this.state.bet * 2
    })
    const cardo = this.generateCard(this.state.deck)
    const newPlayer = this.state.player.cards
  
  newPlayer.push(cardo.randomCard)
  
  this.state.player.count = this.state.player.count + this.generateCount(cardo.randomCard)
  this.state.player.cards = newPlayer
  if (this.state.player.count > 21) {
    this.setState({
      message: "you LOSE ",
      cash: this.state.cash - this.state.bet*2,
      betTemp:0
    })
    setTimeout(() => {
      this.softReset()
     
    }, 2000)
  } else {
    this.setState({
      bet: this.state.bet * 2
    })
    this.playStand()
  }

  

    
  }
  draw(){
    this.setState({
      message: "you Draww",
      betTemp:0
    })
    setTimeout(() => {
      this.softReset()
    
    }, 2000)
  }

  lose() {
    this.setState({
      message: "you LOSE ",
      cash: this.state.cash - this.state.bet,
      betTemp:0
    })
    setTimeout(() => {
      this.softReset()
     
    }, 2000)
  }

  bjwin() {
    const newCash = this.state.cash + this.state.bet*1.5
    this.setState({
      cash: newCash,
      message: "Blackjack!!"
    })

    setTimeout(() => {
      this.softReset()
    
    }, 2000)

  }
  win() {

    this.setState({
      message: "you Winnn",
      cash: this.state.cash + this.state.bet,
      betTemp:0
    })
    setTimeout(() => {
      this.softReset()
     
    }, 2000)
  }

  checkBJ(){

    if (this.state.dealer.count === 21 && this.state.player.count === 21) {
      this.draw()
    }
    if (this.state.dealer.count === 21){
      this.lose()
    }
    if (this.state.player.count === 21) {
      this.bjwin()
    }

  }

  generateCount(card) {
    if (typeof card.number === 'number'){
      return card.number
    } else if (card.number === 'A') {
      return 11
    } else {
      return 10
    }
  }
  

  setUp() {
    
    const deck = this.generateDeck()
    
    const {newDeck, player,dealer} = this.dealCards(deck)

    this.setState({
      deck: newDeck,
      hand: "none",
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
    const dealerCard2 = this.generateCard(playerCard2.newDeck)   
    const player = {cards: [playerCard1.randomCard, playerCard2.randomCard], count: this.generateCount(playerCard1.randomCard) + this.generateCount(playerCard2.randomCard)}
    const dealer = {cards: [dealerCard1.randomCard, dealerCard2.randomCard], count: this.generateCount(dealerCard1.randomCard) + this.generateCount(dealerCard2.randomCard)}
  
    
    return {newDeck :dealerCard2.newDeck, player, dealer}
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
  }

  valChange(e){
    
    this.setState({val:parseInt(e.target.value)});
    
  }

  softReset(){
    const deck = this.generateDeck()
    
    const {newDeck, player,dealer} = this.dealCards(deck)

    this.setState({
      deck: newDeck,
      hand: "none",
      button: "block",
      bet:0,
      betTemp: 0,
      message: "",
      val: "",
      player,
      dealer
      
    })
  }
  

  start() {
    
    if (this.state.val > this.state.cash){
      this.setState({
        message: "nope nibba",
        bet: "0"
      })
    } else if (this.state.bet === 0 && this.state.val === "") {
      alert("You gotta bet something")
    } else if (typeof this.state.val === 'number'){
      
      this.setState({
        bet: this.state.val,
        hand:"block",
        betTemp: this.state.bet
      
      })

      this.checkBJ();
    }else {
      
      this.setState({
        hand:"block",
        betTemp: this.state.bet
      
      })

      this.checkBJ();
    }
    
  }

  playerHit() {
    
    if (this.state.betTemp === 0) {
      alert("bet something first")
    } else {
      const cardo = this.generateCard(this.state.deck)
      const newPlayer = this.state.player.cards
    
    newPlayer.push(cardo.randomCard)
    
    this.state.player.count = this.state.player.count + this.generateCount(cardo.randomCard)
    this.state.player.cards = newPlayer
    
      
      if (this.state.player.count > 21) {
        this.lose()
      }
      this.setState({
        deck: cardo.newDeck
      })

    }

    
  }

  playStand(){
    if (this.state.dealer.count < 17) {
      const cardo = this.generateCard(this.state.deck)
      const newDealer = this.state.dealer.cards
      newDealer.push(cardo.randomCard)
      this.state.dealer.count = this.state.dealer.count + this.generateCount(cardo.randomCard)
      this.state.dealer.cards = newDealer
      this.setState({})
      this.playStand()
      
    } else {
     
      if (this.state.player.count > this.state.dealer.count || this.state.dealer.count > 21) {
        this.win()
      } else {
        this.lose()
      }
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
      <button onClick = {this.setUp}>New Game</button>
      <button onClick = {this.playerHit}>Hit</button>
      <button onClick = {this.playStand}>Stand</button>
      <button onClick = {this.double}>Double</button>
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
          <div class = "words">YOUR HAND {"     "} {this.state.player.count}
          </div>
              {this.state.player.cards.map((card)=>{
                return <div class="card-small">
                <p class="card-text">{card.number}</p>
                <p class="card-img ">{card.suit}</p>
              </div>

              })}
            
            
          </div>

         

         
          
          <div className = "boardYou" style = {{display:this.state.hand}}>
          <div class = "words2">
              Dealer's hand 
          </div>
          {this.state.dealer.cards.map((card)=>{
                return <div class="card-small">
                <p class="card-text">{card.number}</p>
                <p class="card-img ">{card.suit}</p>
              </div>

              })}          
           </div>
           
        </div>
      </div>
    </div>
    )
  }
}



export default App;
