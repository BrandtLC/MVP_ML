from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import sys

app = Flask(__name__)
CORS(app)

try:
    modelo = joblib.load('modelo_final_svm.joblib')
except FileNotFoundError:
    print("Arquivo do modelo não encontrado.")
    sys.exit(1)
    

@app.route('/')
def home():
    return "API no ar"

@app.route('/predict', methods=['POST'])
def predict():
    return "Rota funcionando"