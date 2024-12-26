import logo from './logo.svg';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";

function App() {

  const [data, setData] = useState(null);
  // const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://api.twelvedata.com/time_series?symbol=7203:JPX&interval=1day&apikey=a9ac51856e6e4d64a24dc634f8bafcf6')
        .then(response => response.json())
        .then(json => {
          console.log(json);
          setData(json);
          });
          }, []);
          
  if (!data) {
    return <div>Loading...</div>;
  }

  const { meta, values } = data;
  // const { Spot } = require('@binance/connector')

  // const apiKey = ''
  // const apiSecret = ''
  // const client = new Spot(apiKey, apiSecret)

  // // Get account information
  // client.account().then(response => client.logger.log(response.data))

  // // Place a new order
  // client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
  //   price: '350',
  //   quantity: 1,
  //   timeInForce: 'GTC'
  // }).then(response => client.logger.log(response.data))
  //   .catch(error => client.logger.error(error))
  
  const closeKey = "close";
  const lowKey = "low";
  const openKey = "open";
  const highKey = "high";

  return (
    <div className="text-left">
      <h1 className="text-left">{meta.currency}</h1>
      <h2 className="text-right">Meta Data</h2>
      <table className="table-bordered">
        <thead>
          <tr>
            <th>Type</th>
            <th>Symbol</th>
            <th>Currency</th>
            <th>Interval</th>
            <th>Exchange</th>
            <th>Time Zone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{meta.type}</td>
            <td>{meta.symbol}</td>
            <td>{meta.currency}</td>
            <td>{meta.interval}</td>
            <td>{meta.exchange}</td>
            <td>{meta.exchange_timezone}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-right">Prices</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={values.slice(0, 10)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={openKey} stroke="#ff7300" />
          <Line type="monotone" dataKey={highKey} stroke="#387908" />
          <Line type="monotone" dataKey={lowKey} stroke="#82ca9d" />
          <Line type="monotone" dataKey={closeKey} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
