from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests
model = joblib.load('titanic_model.pkl')

@app.route('/')
def home():
    return "Titanic Survival Prediction API"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    features = [data['Pclass'], data['Age_wiki'], data['SibSp'], data['Parch'], data['Fare'], data['Sex'], data['Embarked']]
    final_features = [np.array(features)]
    prediction = model.predict(final_features)
    
    output = 'Survived' if prediction[0] == 1 else 'Did not survive'
    
    return jsonify(prediction=output)

if __name__ == "__main__":
    app.run(debug=True)
