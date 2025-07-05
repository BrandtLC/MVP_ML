import pytest
import json
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_previsao_performance(client):
    # Paciente com perfil saudável
    paciente_saudavel = {
        "age": 41, "sex": "Female", "cp": "non-anginal", "trestbps": 130.0, 
        "chol": 204.0, "fbs": "false", "restecg": "lv hypertrophy", "thalch": 172.0, 
        "exang": "false", "oldpeak": 1.4, "slope": "upsloping", "ca": 0.0, 
        "thal": "normal"
    }

    response_saudavel = client.post(
        '/predict',
        data=json.dumps(paciente_saudavel),
        content_type='application/json'
    )
    assert response_saudavel.status_code == 200
    data_saudavel = json.loads(response_saudavel.data)
    assert data_saudavel['diagnostico_previsto'] == 0


    # Paciente com perfil doente
    paciente_doente = {
        "age": 67, "sex": "Male", "cp": "asymptomatic", "trestbps": 160.0,
        "chol": 286.0, "fbs": "false", "restecg": "lv hypertrophy", "thalch": 108.0,
        "exang": "true", "oldpeak": 1.5, "slope": "flat", "ca": 3.0,
        "thal": "normal"
    }
    
    response_doente = client.post(
        '/predict',
        data=json.dumps(paciente_doente),
        content_type='application/json'
    )

    assert response_doente.status_code == 200

    data_doente = json.loads(response_doente.data)
    assert data_doente['diagnostico_previsto'] == 1