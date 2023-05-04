const express = require('express');
const { programacion } = require('../database/db.json');

const routerProgramacion = express.Router();

const ordena = (lista, filtro) => {
  if (filtro === 'vistas' || filtro === 'id') 
    lista.sort((a, b) => b[filtro] - a[filtro]);
  if (filtro === 'titulo' || filtro === 'lenguaje' || filtro ==='nivel') 
    lista.sort((a, b) => {
			if (a[filtro].toLowerCase() < b[filtro].toLowerCase()) return -1;
			if (a[filtro].toLowerCase() > b[filtro].toLowerCase()) return 1;
			return 0;
		});  
	else lista.sort((a, b) => a.id - b.id);
  return lista;
}

routerProgramacion
  .get('/', (req, res) => {
    const {
      query: { ordenar },
    } = req;
    const resultados = ordena(programacion, ordenar);
    res.send({ status: 'OK', data: resultados });
  })

  .get('/:lenguaje', (req, res) => {
    const {
      params: { lenguaje },
      query: { ordenar },
    } = req;
    try {
      const lista = programacion.filter((curso) => curso.lenguaje === lenguaje);

      if (lista.length === 0) {
        throw {
          status: 404,
          message: `No existen cursos de ${lenguaje}`,
        };
      }
      const resultados = ordena(lista, ordenar);
      res.send({ status: 'OK', data: resultados });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  });

module.exports = routerProgramacion;