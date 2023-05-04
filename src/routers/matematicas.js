const express = require('express');
const { matematicas } = require('../database/db.json');

const routerMatematicas = express.Router();

const ordena = (lista, filtro) => {
	if (filtro === 'vistas' || filtro === 'id') lista.sort((a, b) => b[filtro] - a[filtro]);
	if (filtro === 'titulo' || filtro === 'tema' || filtro === 'nivel')
		lista.sort((a, b) => {
			if (a[filtro].toLowerCase() < b[filtro].toLowerCase()) return -1;
			if (a[filtro].toLowerCase() > b[filtro].toLowerCase()) return 1;
			return 0;
		});
	else lista.sort((a, b) => a.id - b.id);
	return lista;
};

routerMatematicas
  .get('/', (req, res) => {
    const {			
			query: { ordenar },
		} = req;
    const resultados = ordena(matematicas, ordenar);
		res.send({ status: 'OK', data: resultados });    
  })

  .get('/:tema', (req, res) => {
    const {
      params: { tema },
      query: { ordenar },
    } = req;

    try {
      const lista = matematicas.filter((curso) => curso.tema === tema);

      if (lista.length === 0) {
        throw {
          status: 404,
          message: `No existen cursos de ${tema}`,
        };
      }

      const resultados = ordena(lista, ordenar);
			res.send({ status: 'OK', data: resultados });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  })


module.exports =  routerMatematicas;
