import React from 'react';
import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.adressOfImages = [];
    this.state = {
      imageNumber: [],
    }
    this.shuffle = this.shuffle.bind(this);
  }
  // раскладка карт при нажатии кнопки "Начать игру"
  shuffle () {
    let arrayOfImageNumber = [];
    for (let k = 1; k<13; k++){
      arrayOfImageNumber.push(k);
    }
    //Тасование Фишера — Йетса
    for (let i = arrayOfImageNumber.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arrayOfImageNumber[i], arrayOfImageNumber[j]] = [arrayOfImageNumber[j], arrayOfImageNumber[i]];
      arrayOfImageNumber[i] = arrayOfImageNumber[i] > 6 ? arrayOfImageNumber.length + 1 - arrayOfImageNumber[i]: arrayOfImageNumber[i];
    }
    arrayOfImageNumber[0] = arrayOfImageNumber[0] > 6 ? arrayOfImageNumber.length + 1 - arrayOfImageNumber[0]: arrayOfImageNumber[0];
    this.setState({imageNumber: arrayOfImageNumber});
    // console.log('after:', this.state.imageNumber);
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.shuffle}>Начать игру</button>
        <div className="block block-1">
          <div className={"image image" + this.state.imageNumber[0]}></div>
          <div className={"image image" + this.state.imageNumber[1]}></div>
          <div className={"image image" + this.state.imageNumber[2]}></div>
          <div className={"image image" + this.state.imageNumber[3]}></div>
        </div>
        <div className="block block-2">
          <div className={"image image" + this.state.imageNumber[4]}></div>
          <div className={"image image" + this.state.imageNumber[5]}></div>
          <div className={"image image" + this.state.imageNumber[6]}></div>
          <div className={"image image" + this.state.imageNumber[7]}></div>
        </div>
        <div className="block block-3">
          <div className={"image image" + this.state.imageNumber[8]}></div>
          <div className={"image image" + this.state.imageNumber[9]}></div>
          <div className={"image image" + this.state.imageNumber[10]}></div>
          <div className={"image image" + this.state.imageNumber[11]}></div>
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
//     this.shuffle = this.shuffle.bind(this);
//   }
//   shuffle (e) {
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
//         <button onClick={this.shuffle}>Начать игру</button>
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