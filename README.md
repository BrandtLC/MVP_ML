
# MVP: Previsão de Risco Cardíaco

Este projeto é um MVP de uma aplicação full-stack que utiliza um modelo de Machine Learning para prever o risco de um paciente ter uma doença cardíaca com base em seus dados clínicos.

A aplicação consiste em:
- Um notebook com toda a análise, limpeza de dados e treinamento do modelo.
- Um back-end em Python com Flask, que executa o algoritmo treinado através de uma API REST.
- Um front-end desenvolvido em React com Vite, onde um usuário pode inserir os dados e receber a predição.

## Tecnologias Utilizadas

**Back-end:**
- Python 3.10
- Flask
- Scikit-learn
- Pandas & NumPy
- Joblib
- PyTest

**Front-end:**
- Node.js v20.19.0
- React
- Vite
- Axios
## Pré-Requisitos
Os seguintes softwares são necessários para rodar o projeto

1. **Python:** Versão 3.10 ou superior.
2.  **Node.js:** **Versão 20**.
3.  **Git:** Para clonar o repositório.
## Instalar e configurar
1.  **Clone o repositório:**
    ```
    git https://github.com/BrandtLC/MVP_ML.git
    ```

2.  **Configure o Back-end:**
    ```bash
    # Entre na pasta do back-end
    cd back

    # Crie um ambiente virtual
    python -m venv venv

    # Ative o ambiente virtual
    source venv/bin/activate

    # Instale as dependências do back-end
    pip install -r requirements.txt
    ```

3.  **Configure o Front-end:**
    ```bash
    # Volte para a raiz e navegue para a pasta do front
    cd ../front

    # Instale as dependências do front-end
    npm install
    ```
    
## Rodando o Projeto
Para rodar a aplicação, você precisará de **dois terminais abertos** simultaneamente.

**Rodando o Back-end:**
```bash
# Navegue até a pasta do back-end
cd back

# Ative o ambiente virtual (se não estiver ativo)
source venv/bin/activate

# Inicie o servidor Flask
python app.py

#O back-end estará rodando em http://localhost:5000.
```
**Rodando o Front-end:**
```bash
# Navegue até a pasta do front-end
cd front

# Inicie o servidor de desenvolvimento do Vite
npm run dev

#O front-end estará rodando em http://localhost:5174/
```