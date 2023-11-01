import React, { useState, useEffect } from 'react';

function SettleUp() {
    const [amount, setAmount] = useState('');
    const [paymentResult, setPaymentResult] = useState('');
  
    const handlePayment = () => {
      const parsedAmount = parseFloat(amount);
  
      if (isNaN(parsedAmount)) {
        setPaymentResult('Please enter a valid amount.');
      } else {
        setPaymentResult(`Payment of $${parsedAmount.toFixed(2)} has been processed successfully.`);
      }
    };
  
    return (
      <div>
        <h1>Payment Page</h1>
        <p>Enter the amount to pay:</p>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handlePayment}>Pay</button>
        <div>{paymentResult}</div>
      </div>
    );
  }
  
  export default SettleUp;