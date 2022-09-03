const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3_000;
const { insertar, leer, actualizar, eliminar } = require('./pg.js');

app.use(express.static('./public', { root: process.cwd() }));
app.use(express.json());
app.use('/usuarios', (req, res, next)=>{
  req.headers.authorization === '123'
  ? next() 
  : res.status(403).json({code:403, message: 'Usted no está autorizado'});
});

app.get('/', (req, res) => res.sendFile('./public/index.html', { root: process.cwd() }));

app.get('/ejercicios', async (req, res) => {
  const result = await leer();
  res.status(result?.code ? 500 : 200).json(result);
});

app.post('/ejercicios', async (req, res) => {
  const result = await insertar(Object.values(req.body));
  res.status(result?.code ? 500 : 201).json(result);
});

app.put('/ejercicios', async (req, res) => {
  const result = await actualizar(Object.values(req.body));
  res.status(result?.code ? 500 : 202).json(result);
});

// DISPONIBILIZA DELETE CON QUERY STRING
// app.delete('/ejercicios', async (req, res)=>{
//   const result = eliminar([req.query.nombre]);
//   res.status(result?.code ? 500 : 202).json(result);
// });

// DISPONIBILIZA DELETE CON PARAMETRO
app.delete('/ejercicios/:nombre', (req, res)=>{
  const result = eliminar([req.params.nombre]);
  res.status(result?.code ? 500 : 202).json(result);
})

app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Page not Found !!!' }));

app.listen(port);

module.exports = { app };