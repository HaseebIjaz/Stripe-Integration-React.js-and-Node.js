import logo from './logo.svg';
import './App.css';
import React,{useState} from "react";
import StripeCheckout from "react-stripe-checkout";
import config from "./config"

function App() {
  const {pk_test, server_url, server_payment_route} = config;
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook"
  })
  const makePayment = token => {
    const body = {
      token, product
    }
    const header = {
      "Content-Type" : "application/json"
    }
    return fetch(`${server_url}/${server_payment_route}`,{
      method: "POST",
      headers:header,
      body:JSON.stringify(body)
    })
    .then(response => {
      console.log({response});
      const {status} = response;
      if(response.ok){
        console.log("Status Ok")
      }
    })
    .catch(error => console.log(error))
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StripeCheckout stripeKey={pk_test} token={makePayment} name='Buy React' amount={product.price*100}>
          <button className='btn-large blue'>{`Buy React in Just ${product.price}$`}</button>
        </StripeCheckout>
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
