import { useState } from 'react';

export default function Checkout() {
  const [amount, setAmount] = useState('');
  const [itemName, setItemName] = useState('');

  const handleCheckout = async () => {
    const response = await fetch('http://localhost:3000/api/payfast/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, item_name: itemName }),
    }); 
    console.log('response of payment ......',response.json)

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error('Error initiating payment:', data.error);
    }
  };

  return (
     <>
 
<div>
      <h1>Checkout</h1>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleCheckout}>Pay Now</button>
    </div>
     </>
  
  );
}
