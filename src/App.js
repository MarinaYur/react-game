import React from 'react';
import './App.css';
import logo from './images/logo.svg';
import SoundsMusic from './SoundsMusic';
// import Statistics from './Statistics';


class App extends React.Component {
  userState;
  constructor(props) {
    super(props);
    this.timer = () => { };
    this.theBestResult = 0;
    this.displayStatistics = 'statistics-list';
    this.statistics = [];
    this.twoOpenedValue = []; //for accumulating and comparing opened cards
    this.setTimer = 'No timer';
    this.state = {
      cardLimitation: 0, //limitation on opening cards, no more than 2
      imageNumber: [],
      progressGame: 'before start: cards not available',
      remainingTime: 'No timer',
      setNumberOfCards: '12',
      backgroundColor: 'rgba(21, 126, 7, 0.61)',
      countPairsOfOpenedCards: 1,  // number of opened card pairs
      popapMessage: 'To start the game, click on the "Start Game"',
      classActive: 'statistics-list_none'
    }

    this.startGame = this.startGame.bind(this);
    this.timeToRemember = this.timeToRemember.bind(this);
    this.openCloseCards = this.openCloseCards.bind(this);
    this.timerOfGame = this.timerOfGame.bind(this);
    this.chooseTimer = this.chooseTimer.bind(this);
    this.chooseNumberOfCards = this.chooseNumberOfCards.bind(this);
    this.setBackgroundColor = this.setBackgroundColor.bind(this);
    this.hideExtraCards = this.hideExtraCards.bind(this);
    this.finishGame = this.finishGame.bind(this);
    this.fullscreen = this.fullscreen.bind(this);
    this.showStatistics = this.showStatistics.bind(this);

  }
  componentDidMount() {
    this.userState = JSON.parse(sessionStorage.getItem('userState'));
    if (sessionStorage.getItem('userState')) {
      this.setState({
        cardLimitation: this.userState.cardLimitation, //limitation on opening cards, no more than 2
        imageNumber: this.userState.imageNumber,
        progressGame: this.userState.progressGame,
        remainingTime: this.userState.remainingTime,
        setNumberOfCards: this.userState.setNumberOfCards,
        backgroundColor: this.userState.backgroundColor,
        countPairsOfOpenedCards: this.userState.countPairsOfOpenedCards,  // number of opened card pairs
        popapMessage: this.userState.popapMessage,
        classActive: this.userState.classActive
      })

    } else {
      this.setState({
        cardLimitation: 0, //limitation on opening cards, no more than 2
        imageNumber: [],
        progressGame: 'before start: cards not available',
        remainingTime: 'No timer',
        setNumberOfCards: '12',
        backgroundColor: 'rgba(21, 126, 7, 0.61)',
        countPairsOfOpenedCards: 1,  // number of opened card pairs
        popapMessage: 'To start the game, click on the "Start Game"',
        classActive: 'statistics-list_none'
      })
    }
    if (sessionStorage.getItem('theBestResult')) {
      this.theBestResult = sessionStorage.getItem('theBestResult');
    }
    if (sessionStorage.getItem('timer')) {
      this.timer = sessionStorage.getItem('timer');
    }
    if (sessionStorage.getItem('displayStatistics')) {
      this.displayStatistics = sessionStorage.getItem('displayStatistics');
    }
    if (sessionStorage.getItem('twoOpenedValue')) {
      this.twoOpenedValue = sessionStorage.getItem('twoOpenedValue').split(',');
    }

    if (sessionStorage.getItem('setTimer')) {
      this.setTimer = sessionStorage.getItem('setTimer');
    }

    if (sessionStorage.getItem('statistics')) {
      this.statistics = sessionStorage.getItem('statistics').split(',');
    }
  }


  componentDidUpdate(nextProps, nextState) {
    this.timerOfGame();
    sessionStorage.setItem('userState', JSON.stringify(nextState));
    sessionStorage.setItem('userProps', JSON.stringify(nextProps));
    sessionStorage.setItem('theBestResult', this.theBestResult);
    sessionStorage.setItem('displayStatistics', this.displayStatistics);
    sessionStorage.setItem('statistics', this.statistics);
    sessionStorage.setItem('twoOpenedValue', this.twoOpenedValue);
    sessionStorage.setItem('setTimer', this.setTimer);
    sessionStorage.setItem('timer', this.timer);
  }

  fullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  //сhoose timer settings
  chooseTimer(e) {
    if (this.state.progressGame === 'before start: cards not available') {
      this.setTimer = e.target.getAttribute('data');
      this.setState({
        remainingTime: e.target.getAttribute('data')
      })
    }
  }

  //сhoose settings number of cards
  chooseNumberOfCards(e) {
    if (this.state.progressGame === 'before start: cards not available') {
      this.setState({ setNumberOfCards: e.target.getAttribute('data') });
    }
  }

  setBackgroundColor(e) {
    console.log('this.state.progressGame', this.state.progressGame);
    if (this.state.progressGame === 'before start: cards not available') {
      this.setState({ backgroundColor: e.target.getAttribute('data') });

    }
    e.target.closest('.App').style.background = this.state.backgroundColor;
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
  hideExtraCards() {
    return {
      display: this.state.setNumberOfCards === '12' ? 'none' : 'flex'
    }
  };

  showStatistics() {
    if (this.state.classActive === 'statistics-list_none') {
      this.setState({
        classActive: 'statistics-list',
      })
    } else
      this.setState({
        classActive: 'statistics-list_none',
      })
  }

  //timer setting
  timerOfGame(e) {
    if (this.state.remainingTime === 'No timer') {
      return;
    }
    if (this.state.progressGame === 'before start: cards not available') {
      return;
    }
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (!this.state.remainingTime) {
        clearInterval(this.timer);
        return false;
      }
      this.setState({
        remainingTime: this.state.remainingTime - 1
      });
    }, 1000)
  }

  finishGame() {
    this.setTimer = 'No timer';
    this.setState({
      cardLimitation: 0, //limitation on opening cards, no more than 2
      imageNumber: [],
      progressGame: 'before start: cards not available',
      remainingTime: this.setTimer,
      setNumberOfCards: '12',
      backgroundColor: 'rgba(21, 126, 7, 0.61)',
      countPairsOfOpenedCards: 1,  // number of opened card pairs
      popapMessage: 'To start the game, click on the "Start Game"',
    })
  }

  // the layout of the cards when you click the "Start game" button
  startGame(e) {
    if (this.state.progressGame !== 'user is playing') {
      let arrayOfImageNumber = [];
      let number = this.state.setNumberOfCards;
      for (let k = 1; k <= number; k++) {
        arrayOfImageNumber.push(k);
      }
      this.shuffle(arrayOfImageNumber, number);
      this.timeToRemember(arrayOfImageNumber);
    }
  }

  // Fisher-Yates Shuffle
  shuffle(arrayOfImageNumber, number) {
    for (let i = arrayOfImageNumber.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arrayOfImageNumber[i], arrayOfImageNumber[j]] = [arrayOfImageNumber[j], arrayOfImageNumber[i]];
      arrayOfImageNumber[i] = arrayOfImageNumber[i] > number / 2 ? arrayOfImageNumber.length + 1 - arrayOfImageNumber[i] : arrayOfImageNumber[i];
    }
    arrayOfImageNumber[0] = arrayOfImageNumber[0] > number / 2 ? (arrayOfImageNumber.length + 1 - arrayOfImageNumber[0]) : arrayOfImageNumber[0];
    this.setState({
      imageNumber: arrayOfImageNumber,
      progressGame: 'user is playing',
    });
  }

  timeToRemember(arrayOfImageNumber) {
    setTimeout(() => {
      for (let i = 0; i < arrayOfImageNumber.length; i++) {
        arrayOfImageNumber[i] = arrayOfImageNumber[i] + 'closed';
      }
      this.setState({
        imageNumber: arrayOfImageNumber,
      });
      this.timerOfGame();
    }, 4000);
  }

  openCloseCards(e) {
    if (this.state.remainingTime !== 0 || this.state.remainingTime === 'No timer') {
      if (this.state.progressGame === 'user is playing') {
        if (this.state.cardLimitation === 0) {
          this.twoOpenedValue = [];
        }
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
          if (this.twoOpenedValue.length === 2) {
            if (this.twoOpenedValue[0] === this.twoOpenedValue[1]) {
              this.twoOpenedValue = [];
              this.setState({
                countPairsOfOpenedCards: this.state.countPairsOfOpenedCards + 1,
                cardLimitation: 0,
              });

              if (this.state.countPairsOfOpenedCards === this.state.setNumberOfCards / 2) {
                this.statistics.push((this.setTimer - this.state.remainingTime));
                if (this.statistics.length > 10) {
                  this.statistics.shift();
                }
                this.theBestResult = Math.min(...(this.statistics.filter(item => typeof item === 'number')));
                this.setTimer = 'No timer';
                setTimeout(() =>
                  this.setState({
                    progressGame: 'before start: cards not available',
                    popapMessage: 'To start the new game, click on the "Start Game"',
                    imageNumber: [],
                    countPairsOfOpenedCards: 1,
                    remainingTime: 'No timer',
                  }), 3000);

                this.setState({
                  progressGame: 'before start: cards not available',
                  popapMessage: 'Excellent. You won',
                  remainingTime: this.setTimer,
                })
              }
            } else {
              // if two open cards are NOT equal, you need to hide them again
              setTimeout(() => {
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
                console.log('должно удалиться')
                this.twoOpenedValue = [];
              }, 500);
            }
          }
        }
      }
    } else if (this.state.remainingTime === 0) {
      console.log('remainingTime losing', this.state.remainingTime);
      this.statistics.push('losing');
      if (this.statistics.length > 10) {
        this.statistics.shift();
      }
      this.theBestResult = Math.min(...(this.statistics.filter(item => typeof item === 'number')));
      this.setTimer = 'No timer';
      this.setState({
        remainingTime: 'No timer',
        progressGame: 'before start: cards not available',
        popapMessage: 'Unfortunately, you did not meet the deadline',
      })
      setTimeout(() =>
        this.setState({
          popapMessage: 'But you can try again, click on the "Start Game"',
          imageNumber: [],
          countPairsOfOpenedCards: 1,
        }), 3000);
    }
  }

  addClassNotAvailable() {
    return (this.state.progressGame === 'before start: cards not available' ? " not-available" : '');
  }

  clickApp() {
    const audioSound = document.getElementById('audio-sound');
    audioSound.volume = audioSound.getAttribute('volume');
    audioSound.pause();
    audioSound.load();
    audioSound.play();
  }

  render() {
    return (
      <div className="App" style={{ background: this.state.backgroundColor }} onClick={this.clickApp}>
        <div className="app-top">
          <div className="game-buttons">
            <button className="fullscreen" onClick={this.fullscreen}>fullscreen</button>
            <button className="button-start" onClick={this.startGame}>Start game</button>
            <button className="button-finish" onClick={this.finishGame}>Finish game</button>
          </div>
          <div className={"popap" + (this.state.progressGame !== 'before start: cards not available' ? " disappearance" : "")}>
            {this.state.popapMessage}
          </div>
          <div className="customization">
            <div className="customization__top">
              <p className="customization-score">Score<span>{this.state.countPairsOfOpenedCards - 1}</span></p>
              <p className="customization_title">Game settings</p>
              <div className="statistics">
                <button className="statistics__button" onClick={this.showStatistics}>Statistics</button>
                <div className={this.state.classActive}>
                  <p className="statistics__p">The best<span className="statistics__best">{this.theBestResult}</span> seconds</p>
                  <ol>
                    <li>{this.statistics[0]}</li>
                    <li>{this.statistics[1]}</li>
                    <li>{this.statistics[2]}</li>
                    <li>{this.statistics[3]}</li>
                    <li>{this.statistics[4]}</li>
                    <li>{this.statistics[5]}</li>
                    <li>{this.statistics[6]}</li>
                    <li>{this.statistics[7]}</li>
                    <li>{this.statistics[8]}</li>
                    <li>{this.statistics[9]}</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="settings">
              <div className="timer-game">
                <p className="customization__settings">Timer: <span>{this.state.remainingTime}</span></p>
                <button data='No timer' className={this.isActiveButton('No timer')} onClick={this.chooseTimer}>No timer</button>
                <button data="30" className={this.isActiveButton('30')} onClick={this.chooseTimer}>30 seconds</button>
                <button data="60" className={this.isActiveButton('60')} onClick={this.chooseTimer}>60 seconds</button>
              </div>
              <div>
                <p className="customization__settings">Number of cards</p>
                <button data="12" className={this.isActiveButtonNumber('12')} onClick={this.chooseNumberOfCards}>12</button>
                <button data="18" className={this.isActiveButtonNumber('18')} onClick={this.chooseNumberOfCards}>18</button>
              </div>
              <div>
                <p className="customization__settings">Background color</p>
                <button data="rgba(21, 126, 7, 0.61)" className={this.isActiveButtonColor('rgba(21, 126, 7, 0.61)')} onClick={this.setBackgroundColor}>Green</button>

                <button data="white" className={this.isActiveButtonColor('white')} onClick={this.setBackgroundColor}>White</button>
              </div>
            </div>
            <SoundsMusic />
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
        <footer>
          <p className="footer__title">
            By <a href="https://github.com/MarinaYur">Marina Yurkevich</a>, 2021
          </p>
          <a className="footer__logo" href="https://rs.school/js/">
            <img src={logo} alt="logo"></img>
          </a>
        </footer>
      </div>
    );
  }
}

export default App;