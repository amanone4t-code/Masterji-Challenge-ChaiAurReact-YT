import { useEffect, useCallback, useState, useRef } from 'react'


function App() {

  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 99)

    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*()_+{}|₹~:<>?";

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char); 
      
    }
    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="card-main">
        <h1 className='title'>Password Generator</h1>
        <div className="password-row">
          <input 
            type="text"
            value={password}
            className="password-input"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPassToClipboard}
          className='copy-btn'
          >
            Copy
          </button>
        </div>
        <div className='controls'>
          <div className='control-group'>
            <input 
              type="range"
              min={8}
              max={100}
              value={length}
              className='range-slider'
              onChange={(e) => {setLength(e.target.value)}}
              />
            <label className='range-label'>Length: <span className='range-value'>{length}</span></label>
          </div>
          <div className='checkbox-row'>
            <div className="checkbox-group">
              <div className='custom-checkbox'>
                <input 
                  type="checkbox"
                  defaultChecked={numAllowed}
                  id='numberInput'
                  onChange={() => {
                    setNumAllowed((prev) => !prev)
                  }}
                  />
                <span className='checkmark'></span>
              </div>
              <label htmlFor='numberInput' className='checkbox-label'>Numbers</label>
            </div>
            <div className="checkbox-group">
              <div className='custom-checkbox'>
                <input 
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id='characterInput'
                  onChange={() => {
                    setCharAllowed((prev) => !prev)
                  }}
                  />
                <span className='checkmark'></span>
              </div>
              <label htmlFor='characterInput' className='checkbox-label'>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
