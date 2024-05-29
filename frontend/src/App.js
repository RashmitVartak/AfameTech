import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    Pclass: '',
    Age: '',
    SibSp: '',
    Parch: '',
    Fare: '',
    Sex: '',
    Embarked: ''
  });

  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://127.0.0.1:5000/predict', formData);
    setPrediction(response.data.prediction);
  };

  return (
    <div className="App">
      <h2>Titanic Survival Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>Pclass ( Ticket Class from 1 to 3 ):</label><input type="number" name="Pclass" value={formData.Pclass} onChange={handleChange} /><br />
        <label>Age:</label><input type="number" name="Age" value={formData.Age} onChange={handleChange} /><br />
        <label>SibSp (No. of siblings / spouses aboard the Titanic ):</label><input type="number" name="SibSp" value={formData.SibSp} onChange={handleChange} /><br />
        <label>Parch (No. of parents / children aboard the Titanic ):</label><input type="number" name="Parch" value={formData.Parch} onChange={handleChange} /><br />
        <label>Fare:</label><input type="number" name="Fare" value={formData.Fare} onChange={handleChange} /><br />
        <label>Sex (1 for male, 0 for female):</label><input type="number" name="Sex_male" value={formData.Sex_male} onChange={handleChange} /><br />
        <label>Embarked (1 for C, 2 for Q, 3 for S ):</label><input type="number" name="Embarked" value={formData.Embarked} onChange={handleChange} /><br />
        <button type="submit">Predict</button>
      </form>
      {prediction && <h3>Prediction: {prediction}</h3>}
    </div>
  );
}

export default App;