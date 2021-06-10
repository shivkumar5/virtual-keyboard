import './App.css';
import React,{useState} from 'react';
import KeyboardLayout from './components/KeyboardLayout.js'

function App() {
   const [isShift, setShift] = useState(false);
   const [data, setData] = useState('');
   const [capsOn, setCapsOn] = useState(false);
   const [cursorPosition,setCursorPosition] = useState(0);

  const addNewData = (newData) => {
    setData((data) => data.slice(0,cursorPosition) + newData + data.slice(cursorPosition,data.length))
    textInput.current.setSelectionRange(cursorPosition,cursorPosition);
    setCursorPosition(cursorPosition+1) 
  }

  const updateTextAreaContent = (value) => {
    if(value === 'shift') {
      setShift(!isShift);
    } else if(value === 'caps lock') {
      setCapsOn(!capsOn);
    } else if(value === 'delete') {
      if(cursorPosition===0) {
        setData((data) => data.slice(cursorPosition,data.length))
      }
      else {
        if(data[data.length-1]==='\n') {
          setData((data) => data.slice(0,cursorPosition-1) + data.slice(cursorPosition,data.length))
          setCursorPosition(cursorPosition-1)
        }
        setData((data) => data.slice(0,cursorPosition-1) + data.slice(cursorPosition,data.length))
        setCursorPosition(cursorPosition-1)
      }
    } else if(value === 'tab') {
      addNewData('    ')
    } else if(value === 'return') {
      addNewData('\r\n')
    } else if(value === 'whitespace') {
      addNewData(' ')
    } else if (isShift && value.length===2) {
      addNewData(value[0])
    } else if(isShift && value.length ===1) {
      if(capsOn) {
      addNewData((value).toLowerCase())
      } else if(!capsOn) {
      addNewData((value).toUpperCase())
      }
    } else if (!isShift&& value.length===2) {
      addNewData(value[1])
    } else if(capsOn) {
      addNewData((value).toUpperCase())
    } else if(!capsOn) {
      addNewData((value).toLowerCase())
    }
  };

  // Handle actual keyboard input
  const handleOnChange =(event) => {
    setData(event.target.value);
    setCursorPosition(textInput.current.selectionStart)
  }

  // To hold the textarea reference
  const textInput = React.createRef();

  return (
    <div className="container">
      <div className="pad">
        <textarea 
          ref={textInput} 
          type="text" 
          id="inputArea" 
          value={data} 
          onChange={handleOnChange} 
          className="text--content" 
          placeholder="Type Something cool here!!"
          onClick={() => { setCursorPosition(textInput.current.selectionStart) } }/>
      </div>
      <div className="key-indicator">
        <p>Caps Lock : {capsOn?'On':'Off'}</p>
        <p>Shift : {isShift?'On':'Off'}</p>
      </div>
      <KeyboardLayout onButtonClick={(value)=>updateTextAreaContent(value)} />
    </div>
  );
}

export default App;
