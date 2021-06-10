import React from 'react'
import Button from './Button.js';
import layout from './keyboard-layout.js';

const KeyboardLayout = ({onButtonClick}) => {

  const specialKeys = ['shift', 'tab', 'delete', 'return', 'caps lock', 'whitespace'];

  const shuffleKeysAndNotifyParent = (keyboardRow, keyValue) => {
    shuffleKeys(keyboardRow,keyValue);
    onButtonClick(keyValue)
  }

  const shuffleKeys = (keyboardRow,keyValue) => {
    if(!(specialKeys.includes(keyValue))) {
      shuffle(keyboardRow)
    }
  } 

  const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  return (
    <div className="keyboard-container">
      {
        layout.map((row,i) => {
          return <div className="rows" key={row+i} >
            {
              row.map((value,index)=> {
                return <Button 
                          key={'value'+index} 
                          value={value} 
                          clickButton={() => {shuffleKeysAndNotifyParent(row,value)}}/>
              })
            }
          </div>
        })
      }
    </div>
  )
}

export default KeyboardLayout
