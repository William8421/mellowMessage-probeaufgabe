import './App.css';
import React, { useState } from 'react';
import localData from './probe_arztfinder.json';

function App() {
  const [chosenSymptoms, setChosenSymptoms] = useState([]);
  const [symptomsRelated, setSymptomsRelated] = useState([]);
  const [doctorsInfo, setDoctorsInfo] = useState([]);

  const symptoms = localData[4].data;
  const doctor_symptom_relation = localData[3].data;
  const doctors = localData[2].data;

  let temporaryDoctorsId = [];
  let infoItems = [];

  function checkboxHandler(e) {
    const value = e.target.value;
    const id = e.target.id;
    const element = symptoms.filter((item) => item.symptom === value);

    if (e.target.checked) {
      setChosenSymptoms([
        ...chosenSymptoms,
        {
          id: element[0].id,
          symptom: element[0].symptom,
        },
      ]);
      doctor_symptom_relation.map((item) => {
        if (item.symptom === id) {
          temporaryDoctorsId.push(item.doctor);
        }
      });
      setSymptomsRelated((prevState) => {
        return [...prevState, ...temporaryDoctorsId];
      });

      doctors.filter((item) => {
        return temporaryDoctorsId.map((i) => {
          if (item.id === i) {
            return infoItems.push(item);
          }
        });
      });
      setDoctorsInfo(infoItems);
    } else {
      setChosenSymptoms(
        chosenSymptoms.filter((item) => {
          return item.symptom !== value;
        })
      );
      setDoctorsInfo([]);
    }
  }

  return (
    <div className="App">
      <div className="symptomsContainer">
        {' '}
        <h2>Please choose your symptoms</h2>
        {symptoms.map((symptom, idx) => {
          return (
            <div key={idx}>
              <label>
                <input
                  type="checkbox"
                  value={symptom.symptom}
                  id={symptom.id}
                  onChange={(e) => checkboxHandler(e)}
                />
                {symptom.symptom}
              </label>
            </div>
          );
        })}
      </div>
      <div className="doctorsInfoContainer">
        <h2>Doctor's Information</h2>
        {doctorsInfo.map((item, idx) => {
          return (
            <div key={idx} className="doctorsInfo">
              <div className="namePrefix">
                {item.prefix} {item.firstname} {item.lastname}
              </div>
              <div>phone number: {item.phone}</div>
              <div>special field: {item.special_field}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
