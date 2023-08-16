import React from 'react'
import {Snap} from 'midtrans-client'
import { Helmet } from 'react-helmet';

const Midtrans = () => {

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
    
    const [snapToken, setSnapToken] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    
    const handlePayment = () => {
      // @TODO: Replace 'YOUR_SNAP_TOKEN' with the actual Snap token
      const snapToken = 'f8e49010-b19a-44a0-bb9d-b43cca8bb315';
      setSnapToken(snapToken);
    
      window.snap.embed(snapToken, {
        embedId: 'snap-container',
        onSuccess: function (result) {
          /* You may add your own implementation here */
          setPaymentStatus('success');
          console.log(result);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          setPaymentStatus('pending');
          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          setPaymentStatus('failed');
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert('You closed the popup without finishing the payment');
        },
      });
    };
    useEffect(() => {
      // Dynamically load Snap.js library script
      const script = document.createElement('script');
      script.src = 'https://app.stg.midtrans.com/snap/snap.js';
      script.async = true;
      script.onload = () => {
        console.log('Snap.js script loaded');
      };
      document.head.appendChild(script);
    }, []);

  return (
    <div>
    <Helmet>
        <script
          type="text/javascript"
          src="https://app.stg.midtrans.com/snap/snap.js"
          data-client-key="SET_YOUR_CLIENT_KEY_HERE"
        />
    </Helmet>
   <div>Firebase nih bossss</div>
   <button onClick={createToken}>Create Token</button>
   <button onClick={handlePayment}>Pay!</button>
   <div id="snap-container"></div>
    </div>
  )
}

export default Midtrans