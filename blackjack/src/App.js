import React from 'react';

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
    this.checkBJ = this.checkBJ.bind(this)
    this.win = this.win.bind(this)
    this.lose = this.lose.bind(this)
    this.bjwin = this.bjwin.bind(this)
    this.draw = this.draw.bind(this)
    this.double = this.double.bind(this)
    this.checkCount = this.checkCount.bind(this)
    this.dealerHit = this.dealerHit.bind(this)
    this.checkAce = this.checkAce.bind(this)
    this.stupidAces = this.stupidAces.bind(this)
  }

  stupidAces(){
    if (this.state.player.cards[0].number === 'A' && this.state.player.cards[1].number === 'A') {
      this.setState(prevState => {
        let player = Object.assign({}, prevState.player);  // creating copy of state variable dealer
        player.count = 12
                         // update the count property, assign a new value                 
        return { player};                                 // return new object dealer object
     })
    } 

    if (this.state.dealer.cards[0].number === 'A' && this.state.dealer.cards[1].number === 'A') {
      this.setState(prevState => {
        let dealer = Object.assign({}, prevState.player);  // creating copy of state variable dealer
        dealer.count = 12
                         // update the count property, assign a new value                 
        return { dealer};                                 // return new object dealer object
     })
    }
  }
  dealerHit() {
    const dealo = this.state.dealer.count
    let counto = this.state.player.count
    if (dealo < 17 && counto <= 21) {
      const cardo = this.generateCard(this.state.deck)
      const newDealer = this.state.dealer.cards
      
      newDealer.push(cardo.randomCard)
      if (cardo.number === 'A' && counto > 11) {
        counto = counto - 10
      }
      this.setState(prevState => {
      let dealer = Object.assign({}, prevState.dealer);  // creating copy of state variable dealer
      dealer.count = dealo + this.generateCount(cardo.randomCard)
      dealer.cards = newDealer                    // update the count property, assign a new value                 
      return { dealer , deck:cardo.newDeck};                                 // return new object dealer object
        },()=>{
      this.checkCount()
      this.dealerHit()
      })
    } else {  
      if (counto > 21 && this.state.acePlayer === 0) {
        console.log('here1')
        this.lose()
        
      }
      if ((counto > dealo && counto <= 21)|| (dealo > 21 && counto <= 21)) {
        this.win()
      } else if (counto === dealo){ 
        this.draw()
      }else {
        console.log('here2')
        this.lose()
        
        
      }
    }
  }
  checkAce(arr) {
    let count = 0
    for (var i=0; i < arr.length; i ++){
      if (arr[i].number === 'A') {
        count++
      }
    }
    return count
  }


  checkCount() {
    const counto = this.state.player.count
    const dealo = this.state.dealer.count
    
    
   console.log(this.state)

  

    // if (counto>21 && acesPlayer > 0) {
     
    //   this.setState(prevState => {
    //     let player = Object.assign({}, prevState.player);  // creating copy of state variable dealer
    //     player.count = counto -10
    //                     // update the count property, assign a new value                 
    //     return { player ,acePlayer: acesPlayer - 1};                                 // return new object dealer object
    //       },()=>{
    //     this.checkCount()
        
    //     })
    // }
    // if (dealo>21 && acesDealer > 0) {
      
    //   this.setState(prevState => {
    //     let dealer = Object.assign({}, prevState.dealer);  // creating copy of state variable dealer
    //     dealer.count = dealo -10
    //                     // update the count property, assign a new value                 
    //     return { dealer ,aceDeal: acesDealer - 1};                                 // return new object dealer object
    //       },()=>{
    //     this.checkCount()
        
    //     })
    
    // }
    if (counto > 21) {
      this.lose()
    } else if (dealo > 21) {
      this.win()
    } 
  }

  double() {
    const counto = this.state.player.count
    this.playerHit()
    if (counto <= 21) {
      if (this.state.betTemp !== 0) {
        this.setState({
          bet: this.state.bet * 2
        }, this.dealerHit)
      }  
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
    if (this.state.dealer.count === 21 && this.state.player.count !== 21){
      this.lose()
    }
    if (this.state.player.count === 21 && this.state.dealer.count !== 21) {
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
    let player = {cards: [playerCard1.randomCard, playerCard2.randomCard], count: this.generateCount(playerCard1.randomCard) + this.generateCount(playerCard2.randomCard), altcount: ""}
    let dealer = {cards: [dealerCard1.randomCard, dealerCard2.randomCard], count: this.generateCount(dealerCard1.randomCard) + this.generateCount(dealerCard2.randomCard), altcount: ""}

   
   
    return {newDeck :dealerCard2.newDeck, player, dealer}
    
  }

  generateDeck() {
    const cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    //  const cards = [2,3,'A'];
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
    newDeck.splice(randomNum,1)
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
        message: "You need more cash",
        bet: "0"
      })
    }  else if (typeof this.state.val === 'number'){
      this.setState({
        bet: this.state.val,
        hand:"block",
        betTemp: this.state.val
      }, this.checkBJ())
    }else if (this.state.bet === 0 && this.state.val === "") {
      alert("You gotta bet something")
    }else {
      this.setState({
        hand:"block",
        betTemp: this.state.val
      },this.checkBJ())
    }  

    this.stupidAces()
    
  }

  playerHit() {
    if (this.state.betTemp === 0) {
      alert("bet something first")
    } else {
      const cardo = this.generateCard(this.state.deck)
      const newPlayer = this.state.player.cards
      var countio = this.state.player.count
      newPlayer.push(cardo.randomCard)
      if (cardo.randomCard.number === 'A' && countio > 10){
        countio = countio - 10
        
      }
      

    this.setState(prevState => {
      let player = Object.assign({}, prevState.player);  // creating copy of state variable jasper
      player.count = countio + this.generateCount(cardo.randomCard)
      player.cards = newPlayer                    // update the name property, assign a new value                 
      return { player , deck:cardo.newDeck, betTemp: this.state.bet};                                 // return new object jasper object
    },this.checkCount)

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
      <button onClick = {this.dealerHit}>Stand</button>
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
      <div className="main">
      {this.state.message}
        <div className="table">
          <div className="boardMe" style = {{display:this.state.hand}}>
          <div className = "words">YOUR HAND {"     "} {this.state.player.count}
          </div>
              {this.state.player.cards.map((card)=>{
                return <div className="card-small">
                <p className="card-text">{card.number}</p>
                <p className="card-img ">{card.suit}</p>
              </div>

              })}
          </div>
          <div className = "boardYou" style = {{display:this.state.hand}}>
          <div className = "words2">
              Dealer's hand  {this.state.dealer.count}
          </div>
          {this.state.dealer.cards.map((card)=>{
                return <div className="card-small">
                <p className="card-text">{card.number}</p>
                <p className="card-img ">{card.suit}</p>
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
