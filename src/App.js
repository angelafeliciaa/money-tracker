// import logo from './logo.svg';
import React, { useEffect }  from 'react';
import './App.css';
import { useState } from 'react';
import { get } from 'mongoose';


function App() {

  const [name, setName] = useState('');
  const [datetime, setDateTime] = useState('');
  const [description, setDescription] = useState(''); 
  const [transactions, setTransactions] = useState([]);

  useEffect( () => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL+'/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev) {
    
    ev.preventDefault();

    // send data to backend
    const url = process.env.REACT_APP_API_URL+'/transaction';
    const price = name.split(' ')[0] || 0; 
    // console.log(url);
    fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        price,
        name: name.substring(price.length+1), 
        description, 
        datetime})
    }).then(response => {
      response.json().then(json => {
        setName('');
        setDateTime('');
        setDescription('');
        setTransactions([...transactions, json]);
      })
    });
  }

  let balance = 0;
  for (const transaction of transactions) {
      balance += transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    <main>
      <h1>${balance}<span>{fraction}</span></h1>

      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input type='text' 
                 value={name}
                 onChange = {ev => setName(ev.target.value)}
                 placeholder='+200 new samsung tv'></input>

          <input type='datetime-local'
                 value={datetime}
                 onChange = {ev => setDateTime(ev.target.value)}
                 ></input>
        </div>
        <div className='description'>
          <input type='text'
                 placeholder='description'
                 value = {description}
                 onChange = {ev => setDescription(ev.target.value)}></input>
        </div>
        <button type='submit'>Add new transaction</button>
      </form>

      <div className='transactions'>
        {transactions.length > 0 && transactions.map(transaction => (
          <div className='transaction'>
          <div className='left'>
            <div className='name'>{transaction.name}</div>
            <div className='description'>{transaction.description}</div>
          </div>
          <div className='right'>
            <div className={"price " + (transaction.price<0?'red':'green')}>{transaction.price}</div>
            <div className='datetime'>{transaction.datetime}</div>
          </div>
        </div>
        ))}
        

      </div>
    </main>
  );
}

export default App;
