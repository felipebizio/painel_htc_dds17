import { useEffect, useState } from 'react';
import styles from './TabelaAulas.module.css';
import AbreviaData from './AbreviaData';
import AbreviaInstrutor from './AbreviaInstrutor';
import AbreviarUnidadeCurricular from './AbreviaUc';
import SimplificarAmbiente from './AbreviaAmbiente';
import Loading from '../layout/Loading';

function TabelaAulas() {
  const [aulas, setAulas] = useState([]);
  const [removeLoading, setRemoveLoadind] = useState(false);
  useEffect(() => {
    setTimeout(()=>{
    carregarAulas();
  },3000);
  }, []);

  async function carregarAulas() {
    try {
      const resposta = await fetch('http://localhost:5000/aulas', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!resposta) {
        throw new Error('Erro ao buscar aulas');
      }
      const consulta = await resposta.json();
      setAulas(consulta);
      setRemoveLoadind(true);
      // consulta.log(consulta);
    } catch (error) {
      console.log('Erro ao buscar aulas', error);
    }
  }
  return (
    <div className={styles.aulas}>
      <table className={styles.tabelaAulas}>
        <thead>
          <tr>
            <th>Inicio</th>
            <th>Fim</th>
            <th>Turma</th>
            <th>Instrutor</th>
            <th>Unidade Curricular</th>
            <th>Ambiente</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map((aula) => (
            <tr key={aula.id}>
              <td>{<AbreviaData data={aula.data_hora_inicio} />}</td>
              <td>{<AbreviaData data={aula.data_hora_fim} />}</td>
              <td>{aula.turma}</td>
              <td>{<AbreviaInstrutor instrutor={aula.instrutor} />}</td>
              <td>
                {
                  <AbreviarUnidadeCurricular
                    unidadeCurricular={aula.unidade_curricular}
                  />
                }
              </td>
              <td>{<SimplificarAmbiente ambiente={aula.ambiente} />}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!removeLoading && <Loading/>}
      {removeLoading && aulas.length === 0 && <h1>Não há aulas disponíveis</h1>}
    </div>
  );
}

export default TabelaAulas;
