import React from 'react';
import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.value = [];
    this.adressOfImages = [];
    this.state = {
      imageNumber: [],
      identifier: 0,
      imageOfOpenedCards: []
    }
    this.startGame = this.startGame.bind(this);
    this.timer = this.timer.bind(this);
    this.openCloseCards = this.openCloseCards.bind(this);
  }
  // раскладка карт при нажатии кнопки "Начать игру"
  startGame () {
    let arrayOfImageNumber = [];
    for (let k = 1; k<13; k++){
      arrayOfImageNumber.push(k);
    }
    //Тасование Фишера — Йетса
    for (let i = arrayOfImageNumber.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arrayOfImageNumber[i], arrayOfImageNumber[j]] = [arrayOfImageNumber[j], arrayOfImageNumber[i]];
      arrayOfImageNumber[i] = arrayOfImageNumber[i] > 6 ? arrayOfImageNumber.length + 1 - arrayOfImageNumber[i] : arrayOfImageNumber[i];
    }
    arrayOfImageNumber[0] = arrayOfImageNumber[0] > 6 ? (arrayOfImageNumber.length + 1 - arrayOfImageNumber[0]) : arrayOfImageNumber[0];
    this.setState({imageNumber: arrayOfImageNumber});
    this.timer(arrayOfImageNumber);
  }

  timer (arrayOfImageNumber) {
    setTimeout (() => {
    for (let i = 0; i < arrayOfImageNumber.length; i++) {
      arrayOfImageNumber[i] = arrayOfImageNumber[i] + 'closed';
    }
    this.setState({imageNumber: arrayOfImageNumber})}, 2000);
}

  openCloseCards (e) {
      if (this.state.identifier < 2) {
        let index = e.target.getAttribute('data-index');
        let value = parseInt(this.state.imageNumber[index]);
        this.value.push(value);
        this.setState({
          imageNumber: {
            ...this.state.imageNumber,
            [index]: value,
          },
          identifier: this.state.identifier + 1,
        })
        // если две открытые карточки равны
        if (this.value.length === 2 ) {
          console.log(this.state.imageNumber);
          if (this.value[0] === this.value[1]) {
            this.setState({
              identifier: 0,
              // imageNumber: {
              //   ...this.state.imageNumber,
              //   [index]: value + 'opened',
              // },
            })

            this.value = [];
            console.log(this.value[0] === this.value[1]);
          } else {
            // если две открытые карточки НЕ равны, нужно их снова скрыть
            setTimeout (() => {
              for (let imageNumber in this.state.imageNumber) {
                // if (!this.state.imageNumber[imageNumber].length > 1) {
                  console.log(this.state.imageNumber[imageNumber]);
                  const valueImageNumber = this.state.imageNumber[imageNumber];
                this.setState({
                  imageNumber: {
                    ...this.state.imageNumber,
                    [imageNumber]: valueImageNumber === this.value[0] || valueImageNumber === this.value[1] ? this.state.imageNumber[imageNumber] + 'closed' : this.state.imageNumber[imageNumber] 
                  },
                  identifier: 0,
                })
              // }
            }
              this.value = [];
              console.log(this.state.imageNumber, 'this.state.identifier', this.state.identifier);
            }, 2000);
          }
        }
        console.log(this.state.imageNumber[index], 'index:', e.target.getAttribute('data-index'), 'value:', value);
        console.log('this.value.length:', this.value.length, this.value[0] === this.value[1]);
    }
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.startGame}>Начать игру</button>
        <div className="block block-1">
          <div className={"image image" + this.state.imageNumber[0]} onClick={this.openCloseCards} data-index="0"></div>
          <div className={"image image" + this.state.imageNumber[1]} onClick={this.openCloseCards} data-index="1"></div>
          <div className={"image image" + this.state.imageNumber[2]} onClick={this.openCloseCards} data-index="2"></div>
          <div className={"image image" + this.state.imageNumber[3]} onClick={this.openCloseCards} data-index="3"></div>
        </div>
        <div className="block block-2">
          <div className={"image image" + this.state.imageNumber[4]} onClick={this.openCloseCards} data-index="4"></div>
          <div className={"image image" + this.state.imageNumber[5]} onClick={this.openCloseCards} data-index="5"></div>
          <div className={"image image" + this.state.imageNumber[6]} onClick={this.openCloseCards} data-index="6"></div>
          <div className={"image image" + this.state.imageNumber[7]} onClick={this.openCloseCards} data-index="7"></div>
        </div>
        <div className="block block-3">
          <div className={"image image" + this.state.imageNumber[8]} onClick={this.openCloseCards} data-index="8"></div>
          <div className={"image image" + this.state.imageNumber[9]} onClick={this.openCloseCards} data-index="9"></div>
          <div className={"image image" + this.state.imageNumber[10]} onClick={this.openCloseCards} data-index="10"></div>
          <div className={"image image" + this.state.imageNumber[11]} onClick={this.openCloseCards} data-index="11"></div>
        </div>
      </div>
    );
  }
}

export default App;



// import React from 'react';
// import './App.css';

// class App extends React.Component {
//   constructor (props) {
//     super(props);
//     this.adressOfImages = [];
//     this.state = {
//       class: Array(12).fill(null),
//     }
//     this.startGame = this.startGame.bind(this);
//   }
//   startGame (e) {
//     let array = [];
//     for (let k = 1; k<13; k++){
//       array.push(k);
//     }
//     //Тасование Фишера — Йетса
//     for (let i = array.length - 1; i > 0; i--) {
//       let j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     console.log(e.target);
//     this.fillingWithPictures(e, array);
//   }

//   fillingWithPictures (e, arr) {
//     // let images = document.querySelectorAll('.image');
//     for (let i = 0; i < arr.length; i++) {
//       // this.state.class.setState
//       // images[i].classList = arr[i] < 7 ? 'image image' + arr[i] : 'image image' + (arr.length + 1 - arr[i]);
//     }
//   }

//   render() {
//     return (
//       <div className="App">
//         <button onClick={this.startGame}>Начать игру</button>
//         <div className="block block-1">
//           <div className="image" data="1"></div>
//           <div className="image" data="2"></div>
//           <div className="image" data="3"></div>
//           <div className="image" data="4"></div>
//         </div>
//         <div className="block block-2">
//           <div className="image"></div>
//           <div className="image"></div>
//           <div className="image"></div>
//           <div className="image"></div>
//         </div>
//         <div className="block block-3">
//           <div className="image"></div>
//           <div className="image"></div>
//           <div className="image"></div>
//           <div className="image"></div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;