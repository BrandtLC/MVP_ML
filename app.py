from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import sys

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

try:
    modelo = joblib.load('modelo_final_svm.joblib')
except FileNotFoundError:
    print("Arquivo do modelo não encontrado.")
    sys.exit(1)
    

colunas= [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalch',
    'exang', 'oldpeak', 'slope', 'ca', 'thal'
]
    

@app.route('/')
def home():
    return "API no ar"

@app.route('/predict', methods=['POST'])
def predict():
    request_data = request.get_json()
    
    request_data['fbs'] = 1 if str(request_data['fbs']).lower() == 'true' else 0
    request_data['exang'] = 1 if str(request_data['exang']).lower() == 'true' else 0
    
    df = pd.DataFrame([request_data], columns=colunas)
    
    previsao = modelo.predict(df)

    resultado = int(previsao[0])
    
    return jsonify({
            'diagnostico_previsto': resultado,
            'diagnostico_texto': 'Doente' if resultado == 1 else 'Saudável',
        })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)