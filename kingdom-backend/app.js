import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/players', async (req, res) => {
  const players = await fs.readFile('./data/players.json', 'utf8');
  const parsed = JSON.parse(players)
  res.json(parsed);
});

app.post('/players', async (req, res) => {
  const playerData = req.body;
  const players = await fs.readFile('./data/players.json', 'utf8');
  const parsedPlayers = JSON.parse(players);

  if (!playerData.id) {
    const theData = {
      id: `p${parsedPlayers.length + 1}`,
      ...playerData
    }
    parsedPlayers.push(theData);
  }
  await fs.writeFile('./data/players.json', JSON.stringify(parsedPlayers));
  res.status(201).json({ message: 'Player added' });
});


app.get('/bets', async (req, res) => {
  const bets = await fs.readFile('./data/bets.json', 'utf8');
  const parsed = JSON.parse(bets)

  parsed.forEach(element => {
    if (!element.betId) {
      element.betId = uuidv4();
    }
    return element;
  });

  const players = await fs.readFile('./data/players.json', 'utf8');
  const parsedPlayers = JSON.parse(players)

  res.json({
    players: parsedPlayers,
    bets: parsed
  });
});

app.post('/bets', async (req, res) => {
  const betData = req.body;

  const bets = await fs.readFile('./data/bets.json', 'utf8');
  const parsedBets = JSON.parse(bets);

  if (!betData.betId) {
    const theBet = {
      betId: uuidv4(),
      ...betData
    }
    parsedBets.push(theBet);
  } else {
    const theBet = parsedBets.find(x => x.betId === betData.betId);
    const index = parsedBets.findIndex(x => x.betId === betData.betId);
    parsedBets.splice(index, 1, betData);
  }

  await fs.writeFile('./data/bets.json', JSON.stringify(parsedBets));
  res.status(201).json({ message: 'Bets added' });
});

app.get('/bets/:id', async (req, res, next) => {
  try {
    console.log('specific bets');
    const bets = await fs.readFile('./data/bets.json', 'utf8');
    const parsedBets = JSON.parse(bets);
    const bet = parsedBets.find(bet => bet.betId === req.params.id);

    const players = await fs.readFile('./data/players.json', 'utf8');
    const parsedPlayers = JSON.parse(players)

    res.json({ bet: bet, players: parsedPlayers });
  } catch (error) {

  }
});

app.put('/bets/:id', async (req, res) => {
  const betData = req.body.bet;

  console.log(betData);

  const bets = await fs.readFile('./data/bets.json', 'utf8');
  const parsedBets = JSON.parse(bets);

  if (!betData.betId) {
    betData.betId = uuidv4();
    console.log(betData.betId);
  }
  // if (orderData === null || orderData.items === null || orderData.items.length === 0) {
  //   return res
  //     .status(400)
  //     .json({ message: 'Missing data.' });
  // }

  // if (
  //   orderData.customer.email === null ||
  //   !orderData.customer.email.includes('@') ||
  //   orderData.customer.name === null ||
  //   orderData.customer.name.trim() === '' ||
  //   orderData.customer.street === null ||
  //   orderData.customer.street.trim() === '' ||
  //   orderData.customer['postal-code'] === null ||
  //   orderData.customer['postal-code'].trim() === '' ||
  //   orderData.customer.city === null ||
  //   orderData.customer.city.trim() === ''
  // ) {
  //   return res.status(400).json({
  //     message:
  //       'Missing data: Email, name, street, postal code or city is missing.',
  //   });
  // }

  // const newOrder = {
  //   ...orderData,
  //   id: (Math.random() * 1000).toString(),
  // };
  // const orders = await fs.readFile('./data/orders.json', 'utf8');
  // const allOrders = JSON.parse(orders);
  // allOrders.push(newOrder);
  // await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  // res.status(201).json({ message: 'Bet added!' });
}
);

app.put('/bets', async (req, res) => {
  const places = req.body.places;

  await fs.writeFile('./data/bets.json', JSON.stringify(places));

  res.status(200).json({ message: 'User places updated!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
