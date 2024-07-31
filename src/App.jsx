import {useState, useRef, useEffect} from 'react'
import './App.css'

function App() {
  const [password,setPassword] = useState("");
  const passwordRef = useRef(null);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [toastMessage, setToastMessage] = useState("");

  const passwordGenerator = () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }
    setPassword(pass);
  };

  useEffect(() => {
    passwordGenerator();
  },[length, numberAllowed, charAllowed]);
  
  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    password.current?.selectionRange(0,length);
    navigator.clipboard.writeText(password).then(() => {
      setToastMessage('Copied!');
      setTimeout(() => {
        setToastMessage('');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
    
  }
  
  const Toast = ({message, onClose}) => {
    if(!message) return null;
    return (
      <div
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
        onClick={onClose}
      >
        {message}
      </div>
    );

  }
  return (
    <div className='w-full h-screen justify-center items-center flex bg-black'
      style={{ backgroundImage: "url('https://images.pexels.com/photos/39624/padlock-lock-chain-key-39624.jpeg?auto=compress&cs=tinysrgb&w=800')",
      backgroundSize: 'cover',
      }}>
      <div className="w-full max-w-md h-fit mx-auto shadow-md rounded-lg px-8 py-6 my-8 bg-gray-500 text-orange-500">
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
                type="text"
                value={password}
                className="outline-none w-full py-1 px-3"
                placeholder="Password"
                readOnly
                ref={passwordRef}
            />
            <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 mx-4 shrink-0 rounded-lg'
            >copy</button>
            <Toast message = {toastMessage} onClose = {() => setToastMessage('')}/>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                  setNumberAllowed((prev) => !prev);
              }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="characterInput"
                  onChange={() => {
                      setCharAllowed((prev) => !prev )
                  }}
              />
              <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
