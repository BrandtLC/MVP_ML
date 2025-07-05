import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const valores_limites = {
  age: { min: 0, max: 120 },
  trestbps: { min: 80, max: 220 },
  chol: { min: 100, max: 600 },
  thalch: { min: 60, max: 220 },
  oldpeak: { min: 0, max: 7 },
  ca: { min: 0, max: 4 }
};

const labels = {
  age: `Idade (anos) ${valores_limites.age.min} - ${valores_limites.age.max}`,
  sex: `Sexo`,
  cp: `Tipo de Dor no Peito`,
  trestbps: `Pressão Arterial em Repouso (mm Hg) ${valores_limites.trestbps.min} - ${valores_limites.trestbps.max}`,
  chol: `Colesterol (mg/dl) ${valores_limites.chol.min} - ${valores_limites.chol.max}`,
  fbs: `Açúcar no Sangue em Jejum > 120 mg/dl?`,
  restecg: `Resultado do Eletrocardiograma`,
  thalch: `Frequência Cardíaca Máxima Atingida ${valores_limites.thalch.min} - ${valores_limites.thalch.max}`,
  exang: `Angina Induzida por Exercício?`,
  oldpeak: `Depressão de ST (oldpeak) ${valores_limites.oldpeak.min} - ${valores_limites.oldpeak.max}`,
  slope: `Inclinação do Pico do Segmento ST`,
  ca: `Nº de Vasos Sanguíneos Visíveis ${valores_limites.ca.min} - ${valores_limites.ca.max}`,
  thal: `Resultado do Teste de Talassemia`
};


function App() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalch: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError('');

    const dataToSubmit = {
      ...formData,
      age: Number(formData.age),
      trestbps: Number(formData.trestbps),
      chol: Number(formData.chol),
      thalch: Number(formData.thalch),
      oldpeak: Number(formData.oldpeak),
      ca: Number(formData.ca)
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', dataToSubmit);
      setResult(response.data);
    } catch (err) {
      setError('Ocorreu um erro ao fazer a predição. Verifique se a API do back-end está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Previsão de Risco Cardíaco</h1>
      <p style={{textAlign: 'center', marginTop: '-1rem', marginBottom: '2rem'}}>
        Insira os dados do paciente para obter uma predição do modelo de Machine Learning.
      </p>
      <form onSubmit={handleSubmit}>
        {Object.keys(labels).map((key) => {
          const propriedades_campos = {
            id: key,
            name: key,
            value: formData[key],
            onChange: handleChange,
            required: true
          };
          
          if (['sex', 'cp', 'fbs', 'restecg', 'exang', 'slope', 'thal'].includes(key)) {
            return (
              <div className="form-group" key={key}>
                <label htmlFor={key}>{labels[key]}</label>
                <select {...propriedades_campos}>
                  {key === 'sex' &&<><option value="Male">Masculino</option><option value="Female">Feminino</option></>}

                  {key === 'cp' && <><option value="typical angina">Angina Típica</option><option value="atypical angina">Angina Atípica</option><option value="non-anginal">Dor Não-Anginal</option><option value="asymptomatic">Assintomático</option></>}

                  {key === 'fbs' && <><option value="true">Sim</option><option value="false">Não</option></>}

                  {key === 'restecg' && <><option value="normal">Normal</option><option value="lv hypertrophy">Hipertrofia Ventricular</option><option value="st-t abnormality">Anormalidade da Onda ST-T</option></>}

                  {key === 'exang' && <><option value="true">Sim</option><option value="false">Não</option></>}

                  {key === 'slope' && <><option value="upsloping">Ascendente</option><option value="flat">Plano</option><option value="downsloping">Descendente</option></>}

                  {key === 'thal' && <><option value="normal">Normal</option><option value="fixed defect">Defeito Fixo</option><option value="reversable defect">Defeito Reversível</option></>}
                </select>
              </div>
            );
          } else {
            const validation = valores_limites[key] || {};

            return (
              <div className="form-group" key={key}>
                <label htmlFor={key}>{labels[key]}</label>
                <input
                  type="number"
                  step="any"
                  min={validation.min}
                  max={validation.max}
                  {...propriedades_campos}
                />
              </div>
            );
          }
        })}
        
        <div className="full-width">
          <button type="submit" disabled={loading}>
            {loading ? 'Analisando...' : 'Fazer Previsão'}
          </button>
        </div>
      </form>
      
      {error && <div className="result result-error">{error}</div>}
      
      {result && (
        <div className={result.diagnostico_previsto === 0 ? 'result-safe' : 'result-risk'}>
          <h2>Resultado da Análise</h2>
          <p>Diagnóstico Previsto: <strong>{result.diagnostico_texto}</strong></p>
          <p>Nível de Confiança do Modelo: <strong>{result.nivel_de_confianca}</strong></p>
        </div>
      )}
    </div>
  );
}

export default App;