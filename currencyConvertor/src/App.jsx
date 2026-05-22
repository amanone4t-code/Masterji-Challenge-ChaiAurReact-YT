import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './index.css'
import stockImg from './stock-img.jpeg'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const { data: currencyInfo } = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }



  return (
    <div className="app-wrapper">
      {/* Background layers */}
      <div
        className="app-bg"
        style={{ backgroundImage: `url(${stockImg})` }}
      />
      <div className="app-bg-overlay" />


      {/* Converter Card */}
      <div className="converter-card">
        {/* Header */}
        <div className="card-header">
          <div className="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.94s4.18 1.36 4.18 3.85c0 1.89-1.44 2.98-3.12 3.19z" />
            </svg>
          </div>
          <h1>Currency Converter</h1>
          <p>Real-time exchange rates</p>
        </div>


        <form
          onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}
        >
          {/* From */}
          <div style={{ marginBottom: '0.25rem' }}>
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>

          {/* Swap */}
          <div className="swap-wrapper">
            <button
              type="button"
              className="swap-btn"
              onClick={swap}
              aria-label="Swap currencies"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.5 3.5L3.5 7.5L7.5 11.5V8.5H16.5V6.5H7.5V3.5ZM16.5 20.5L20.5 16.5L16.5 12.5V15.5H7.5V17.5H16.5V20.5Z" />
              </svg>
            </button>
          </div>

          {/* To */}
          <div style={{ marginBottom: '0.25rem' }}>
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisabled
            />
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            className="convert-btn"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>


      </div>
    </div>
  )
}

export default App