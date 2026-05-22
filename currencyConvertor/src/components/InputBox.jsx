import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisabled = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId();

  return (
    <div className={`input-row ${className}`}>
      <div className="amount-section">
        <label htmlFor={amountInputId}>
          {label}
        </label>
        <input
          id={amountInputId}
          type="number"
          placeholder="0.00"
          disabled={amountDisabled}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="currency-section">
        <p>Currency</p>
        <select
          value={selectCurrency}
          disabled={currencyDisable}
          onChange={(e) =>
            onCurrencyChange && onCurrencyChange(e.target.value)
          }
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;