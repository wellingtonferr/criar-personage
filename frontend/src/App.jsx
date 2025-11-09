import React, { useState, useEffect } from 'react';
import './App.css';
import humanoImg from './assets/humano.png';
import elfoImg from './assets/elfo.png';
import orcImg from './assets/orc.png';
import anaoImg from './assets/anao.png';
import magoImg from './assets/mago.png';

function App() {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [habilidades, setHabilidades] = useState([]);
  const [personagens, setPersonagens] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const API_URL = 'http://localhost:3000/personagens';

  const racas = ['humano', 'elfo', 'orc', 'anao', 'mago'];
  const habilidadesPorRaca = {
    humano: ['Força', 'Resistência', 'Carisma', 'Cura'],
    elfo: ['Agilidade', 'Precisão', 'Magia', 'Visão Noturna'],
    orc: ['Brutalidade', 'Força', 'Fúria', 'Grito de Guerra'],
    anao: ['Força Bruta', 'Minerar', 'Construção', 'Resistência ao Álcool'],
    mago: ['Magia', 'Sabedoria', 'Teletransporte', 'Bola de Fogo'],
  };

  const imagensPorRaca = {
    humano: humanoImg,
    elfo: elfoImg,
    orc: orcImg,
    anao: anaoImg,
    mago: magoImg,

  };

  // Buscar personagens salvos
  const carregarPersonagens = async () => {
    const resposta = await fetch(API_URL);
    const data = await resposta.json();
    setPersonagens(data);
  };

  useEffect(() => {
    carregarPersonagens();
  }, []);

  const salvarPersonagem = async () => {
    if (!nome || !raca || habilidades.length === 0) {
      alert('Preencha nome, raça e escolha habilidades.');
      return;
    }

    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, raca, habilidades }),
    });

    if (resposta.ok) {
      setMensagem('Personagem salvo com sucesso!');
      setNome('');
      setRaca('');
      setHabilidades([]);
      carregarPersonagens();
    } else {
      alert('Erro ao salvar personagem.');
    }
  };

  const removerPersonagem = async (id) => {
    if (!window.confirm('Deseja mesmo excluir este personagem?')) return;

    const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (resposta.ok) {
      setMensagem('Personagem removido com sucesso!');
      carregarPersonagens();
    }
  };

  return (
    <div className="container">
      <h1>🎮 Criação de Personagem</h1>

      <div className="form-section">
        <div className="form">
          <label>Nome:</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} /><br></br>

          <label>Raça:</label>
          <select value={raca} onChange={(e) => { setRaca(e.target.value); setHabilidades([]); }}>
            <option value="">Selecione uma raça</option>
            {racas.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          {raca && (
            <>
              <h3>Habilidades ({habilidades.length}/3)</h3>
              {habilidadesPorRaca[raca].map((hab) => (
                <label key={hab}>
                  <input
                    type="checkbox"
                    checked={habilidades.includes(hab)}
                    onChange={() => {
                      if (habilidades.includes(hab)) {
                        setHabilidades(habilidades.filter((h) => h !== hab));
                      } else if (habilidades.length < 3) {
                        setHabilidades([...habilidades, hab]);
                      }
                    }}
                  />
                  {hab}
                </label>
              ))}
            </>
          )}<br></br>

          <button onClick={salvarPersonagem}>Salvar Personagem</button>
          {mensagem && <p className="mensagem">{mensagem}</p>}
        </div>

        <div className="preview">
          {raca ? (
            <img src={imagensPorRaca[raca]} alt={raca} className="personagem-img" />
          ) : (
            <p>Escolha uma raça para ver o personagem.</p>
          )}
        </div>
      </div>

      <h2>🧾 Personagens Criados</h2>
      <ul>
        {personagens.map((p) => (
          <li key={p.id}>
            <strong>{p.nome}</strong>Raça -  ({p.raca}) - ({JSON.parse(p.habilidades).join(', ')})
            <button onClick={() => removerPersonagem(p.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
