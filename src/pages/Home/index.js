import axios from 'axios';
import React,{ useState } from 'react';
import * as S from './styled';
import { useNavigate } from 'react-router-dom';

export default function App(){
  const [usuario, setUsuario] = useState('');
  const navigate = useNavigate();
  const [erro, setErro] = useState(false);

  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`)
    .then(response =>{
      const repositories = response.data;
      const repositoriesName = [];
      repositories.map((repository) => {
        repositoriesName.push(repository.name);
      });
      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setErro(false);
      navigate('/repositories');
    })
    .catch(err => {
      setErro(true);
    });
  }
  


    return (
      <S.HomeContainer>
        <h2>Pesquisa de Repositórios GitHub</h2>
        <S.Content>
          <S.Input className="usuarioInput" placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
          <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
        </S.Content>
        { erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamnete.</S.ErrorMsg> : ''}
      </S.HomeContainer>
    );
}
