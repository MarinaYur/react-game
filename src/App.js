import React from 'react';
import './App.css';
let timer = () => {};
class App extends React.Component {
  constructor (props) {
    super(props);
    this.twoOpenedValue = []; //for accumulating and comparing opened cards
    this.setTimer = 'No timer';
    this.state = {
      cardLimitation: 0, //limitation on opening cards, no more than 2
      imageNumber: [],
      startGame: 'before start: cards not available',
      remainingTime: 'No timer',
      setNumberOfCards: '12',
      backgroundColor: 'white',
      countPairsOfOpenedCards: 1,  // number of opened card pairs
      popapMessage: 'To start the game, click on the "Start Game"',
    }
    this.startGame = this.startGame.bind(this);
    this.timeToRemember = this.timeToRemember.bind(this);
    this.openCloseCards = this.openCloseCards.bind(this);
    this.timerOfGame = this.timerOfGame.bind(this);
    this.chooseTimer = this.chooseTimer.bind(this);
    this.chooseNumberOfCards = this.chooseNumberOfCards.bind(this);
    this.setBackgroundColor = this.setBackgroundColor.bind(this);
    this.hideExtraCards = this.hideExtraCards.bind(this);
  }

  //сhoose timer settings
  chooseTimer (e) {
    console.log('this.state.startGame', this.state.startGame);
    if (this.state.startGame === 'before start: cards not available') {
      this.setTimer = e.target.getAttribute('data');
      this.setState({
        remainingTime: e.target.getAttribute('data')
      })
    }
  }

  //сhoose settings number of cards
  chooseNumberOfCards (e) {
    if (this.state.startGame === 'before start: cards not available') {
      this.setState({setNumberOfCards: e.target.getAttribute('data')});
    }
  }

  setBackgroundColor (e) {
    console.log('this.state.startGame', this.state.startGame);
    if (this.state.startGame === 'before start: cards not available') {
      this.setState({backgroundColor: e.target.getAttribute('data')});
      e.target.closest('.App').style.background = this.state.backgroundColor;
    }
  }


  //user sees which timer button is pressed
  isActiveButton(buttonId) {
    return this.setTimer === buttonId ? 'clicked-timer' : '';
  }

  //user sees which number button is pressed
  isActiveButtonNumber(buttonId) {
    return this.state.setNumberOfCards === buttonId ? 'clicked-timer' : '';
  }

  //user sees which color was selected
  isActiveButtonColor(buttonId) {
    return this.state.backgroundColor === buttonId ? 'clicked-timer' : '';
  }
  
  //remove extra cards if option 12 is selected instead of 18
  hideExtraCards () {
    return {
      display: this.state.setNumberOfCards === '12' ? 'none' : 'flex'
    }
  };

  //timer setting
  timerOfGame (e) {
    if (this.state.remainingTime === 'No timer'){
      return;
    }
    clearInterval(timer);
    timer = setInterval(() => {
      if(!this.state.remainingTime) {
        clearInterval(timer);
        return false;
      }
      this.setState({
        remainingTime: this.state.remainingTime - 1
      });
    }, 1000)
  }

  // the layout of the cards when you click the "Start game" button
  startGame (e) {
    if (this.state.startGame !== 'user is playing') {
      let arrayOfImageNumber = [];
      let number = this.state.setNumberOfCards;
      for (let k = 1; k <= number; k++){
        arrayOfImageNumber.push(k);
      }
      this.shuffle(arrayOfImageNumber, number);
      this.timeToRemember(arrayOfImageNumber);
    }
  }

  // Fisher-Yates Shuffle
  shuffle (arrayOfImageNumber, number) {
    for (let i = arrayOfImageNumber.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arrayOfImageNumber[i], arrayOfImageNumber[j]] = [arrayOfImageNumber[j], arrayOfImageNumber[i]];
      arrayOfImageNumber[i] = arrayOfImageNumber[i] > number/2 ? arrayOfImageNumber.length + 1 - arrayOfImageNumber[i] : arrayOfImageNumber[i];
    }
    arrayOfImageNumber[0] = arrayOfImageNumber[0] > number/2 ? (arrayOfImageNumber.length + 1 - arrayOfImageNumber[0]) : arrayOfImageNumber[0];
    this.setState({
      imageNumber: arrayOfImageNumber,
      startGame: 'user is playing',
      });
  }

  timeToRemember (arrayOfImageNumber) {
    setTimeout (() => {
      for (let i = 0; i < arrayOfImageNumber.length; i++) {
        arrayOfImageNumber[i] = arrayOfImageNumber[i] + 'closed';
      }
      this.setState({
        imageNumber: arrayOfImageNumber,
      });
      this.timerOfGame();
    }, 4000);
  }

  openCloseCards (e) {
    if (this.state.remainingTime !==0 || this.state.remainingTime === 'No timer') {
      if (this.state.startGame === 'user is playing') {
        if (this.state.cardLimitation < 2) {
          let index = e.target.getAttribute('data-index');
          let value = parseInt(this.state.imageNumber[index]);
          this.twoOpenedValue.push(value);
          this.setState({
            imageNumber: {
              ...this.state.imageNumber,
              [index]: value,
            },
            cardLimitation: this.state.cardLimitation + 1,
          })
          // if two open cards are equal
            if (this.twoOpenedValue.length === 2 ) {
              if (this.twoOpenedValue[0] === this.twoOpenedValue[1]) {
                this.setState({
                  countPairsOfOpenedCards: this.state.countPairsOfOpenedCards + 1,
                  cardLimitation: 0,
                });
                this.twoOpenedValue = [];
                if (this.state.countPairsOfOpenedCards === this.state.setNumberOfCards / 2) {
                  setTimeout(() => 
                  this.setState({
                    startGame: 'before start: cards not available',
                    popapMessage: 'To start the new game, click on the "Start Game"',
                    imageNumber: []
                  }), 3000);
                  this.setState({
                    countPairsOfOpenedCards: 1,
                    startGame: 'before start: cards not available',
                    popapMessage: 'Excellent. You won',
                    remainingTime: 'No timer',
                  })
                  console.log('this.state.countPairsOfOpenedCards :', this.state.countPairsOfOpenedCards);
                  console.log('this.state.cardLimitation:', this.state.cardLimitation);
                  console.log(this.state.imageNumber);
                console.log(this.state.countPairsOfOpenedCards);
                }
              } else {
                  // if two open cards are NOT equal, you need to hide them again
                  setTimeout (() => {
                    for (let imageNumber in this.state.imageNumber) {
                      const valueImageNumber = this.state.imageNumber[imageNumber];
                      this.setState({
                        imageNumber: {
                          ...this.state.imageNumber,
                          [imageNumber]: valueImageNumber === this.twoOpenedValue[0] || valueImageNumber === this.twoOpenedValue[1] ? this.state.imageNumber[imageNumber] + 'closed' : this.state.imageNumber[imageNumber]
                        },
                        cardLimitation: 0,
                      })
                    }
                    this.twoOpenedValue = [];
                  }, 2000);
                }
            }
          } 
        }
    } else 
    if (this.state.remainingTime === 0) {
      this.setState({
        startGame: 'before start: cards not available',
        popapMessage: 'Unfortunately, you did not meet the deadline',
        countPairsOfOpenedCards: 1,
      })
      setTimeout(() => 
                  this.setState({
                    popapMessage: 'But you can try again, click on the "Start Game"',
                    imageNumber: [],
                    remainingTime: this.setTimer,
                  }), 3000);
    }
  }

  addClassNotAvailable () {
    return (this.state.startGame === 'before start: cards not available' ? " not-available" : '');
  }

  render() {
    return (
      <div className="App">
        <div className="app-top">
          <button className="button-start" onClick={this.startGame}>Start game</button>
          <div className={"popap" + (this.state.startGame !== 'before start: cards not available' ? " disappearance" : "")}>
            {this.state.popapMessage}
          </div>

          <div className="popap-finish">
            <div className="popap-finish__title"></div>
            <button className="popap-finish__button1">Yes</button>
            <button className="popap-finish__button2">No</button>
          </div>

          <div className="customization">
            <p className = "customization_title">Game settings</p>
            <div className="settings">
              <div className="timer-game">
                <p>Timer: <span>{this.state.remainingTime}</span></p>
                <button data='No timer' className={this.isActiveButton('No timer')} onClick={this.chooseTimer}>No timer</button>
                <button data="30" className={this.isActiveButton('30')} onClick={this.chooseTimer}>30 seconds</button>
                <button data="60" className={this.isActiveButton('60')} onClick={this.chooseTimer}>60 seconds</button>
            </div>
            <div>
              <p>Number of cards</p>
              <button data="12" className={this.isActiveButtonNumber('12')} onClick={this.chooseNumberOfCards}>12</button>
              <button data="18" className={this.isActiveButtonNumber('18')} onClick={this.chooseNumberOfCards}>18</button>
            </div>
            <div>
              <p>Background color</p>
              <button data="white" className={this.isActiveButtonColor('white')} onClick={this.setBackgroundColor}>Green</button>
              <button data="rgba(21, 126, 7, 0.61)" className={this.isActiveButtonColor('rgba(21, 126, 7, 0.61)')} onClick={this.setBackgroundColor}>White</button>
            </div>
            </div>
          </div>
        </div>
        <div className="block block-1">
          <div className={"image image" + this.state.imageNumber[0] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="0"></div>
          <div className={"image image" + this.state.imageNumber[1] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="1"></div>
          <div className={"image image" + this.state.imageNumber[2] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="2"></div>
          <div className={"image image" + this.state.imageNumber[3] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="3"></div>
          <div className={"image image" + this.state.imageNumber[4] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="4"></div>
          <div className={"image image" + this.state.imageNumber[5] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="5"></div>
        </div>
        <div className="block block-2">
          <div className={"image image" + this.state.imageNumber[6] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="6"></div>
          <div className={"image image" + this.state.imageNumber[7] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="7"></div>
          <div className={"image image" + this.state.imageNumber[8] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="8"></div>
          <div className={"image image" + this.state.imageNumber[9] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="9"></div>
          <div className={"image image" + this.state.imageNumber[10] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="10"></div>
          <div className={"image image" + this.state.imageNumber[11] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="11"></div>
        </div>
        <div className="block block-3" style={this.hideExtraCards()}>
          <div className={"image image" + this.state.imageNumber[12] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="12"></div>
          <div className={"image image" + this.state.imageNumber[13] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="13"></div>
          <div className={"image image" + this.state.imageNumber[14] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="14"></div>
          <div className={"image image" + this.state.imageNumber[15] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="15"></div>
          <div className={"image image" + this.state.imageNumber[16] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="16"></div>
          <div className={"image image" + this.state.imageNumber[17] + " " + this.addClassNotAvailable()} onClick={this.openCloseCards} data-index="17"></div>
        </div>
      </div>
    );
  }
}

export default App;