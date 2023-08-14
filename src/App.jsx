import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Auth } from './components/auth'
import {Snap} from 'midtrans-client'

function App() {
//   let snap = new midtransClient.Snap({

// });

const snap = new Snap({
    isProduction : false,
    serverKey : 'SB-Mid-server-_cL8JNy6MGc-IOePF9J0amYW',
    clientKey : 'SB-Mid-client-MmH0YcC1XzyHoQdZ'
});

let parameter = {
"transaction_details": {
    "order_id": "test-transaction-123",
    "gross_amount": 200000
}, "credit_card":{
    "secure" : true
}
};

const createToken = async () => {
  snap.createTransaction(parameter)
  .then((transaction)=>{
      // transaction token
      let transactionToken = transaction.token;
      console.log('transactionToken:',transactionToken);
})
}

  const [count, setCount] = useState(0)

  return (
   <div>
   <div>Firebase nih bossss</div>
   <button onClick={createToken}>Create Token</button>
    <Auth/>
   </div>
  )
}

export default App
