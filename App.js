import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [experiments, setExperiments] = useState([]);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    axios.get('/experiments').then((response) => {
      setExperiments(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedExperiment) {
      axios.get(`/experiment/${selectedExperiment}/runs`).then((response) => {
        setRuns(response.data);
      });
    }
  }, [selectedExperiment]);

  return (
    <div className="App">
      <h1>MLflow Experiment Viewer</h1>
      <div>
        <h2>Experiments</h2>
        <ul>
          {experiments.map((experiment) => (
            <li key={experiment} onClick={() => setSelectedExperiment(experiment)}>
              {experiment}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {selectedExperiment && (
          <>
            <h2>Runs for {selectedExperiment}</h2>
            <table>
              <thead>
                <tr>
                  <th>Run ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Start Time</th>
                </tr>
              </thead>


              <tbody>
                {runs.map((run) => (
                  <tr key={run.run_id}>
                    <td>{run.run_id}</td>
                    <td>{run.name}</td>
                    <td>{run.status}</td>
                    <td>{run.start_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default App;