const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const infoCursos = require('./src/database/db.json');

//* Routers
const routerMatematicas = require('./src/routers/matematicas')
const routerProgramacion = require('./src/routers/programacion')

app.use('/api/cursos/programacion',routerProgramacion);

app.use('/api/cursos/matematicas', routerMatematicas);

app.get('/', (req, res) => {
  res.send('Mi primer servidor con Express. Cursos 💻.');
})
// TODO: Implementar ordenar sin ordenar el original
app.get('/api/cursos', (req, res) => {
  const { query: { ordenar } } = req;
  if (ordenar === 'vistas') {
    for (const tipo in infoCursos) {
      if (Object.hasOwnProperty.call(infoCursos, tipo)) {
        const materia = infoCursos[tipo];
        materia.sort((a, b) => a.vistas - b.vistas);
      }
    }
  }
  res.send({ status: 'OK', data: infoCursos });
})





app.listen(PORT, () => console.log(`Server escuchando en puerto ${PORT}...`))