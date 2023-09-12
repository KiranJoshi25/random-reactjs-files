from flask import Flask, request, jsonify
import mlflow

app = Flask(__name__)

@app.route('/experiments', methods=['GET'])
def list_experiments():
    experiments = mlflow.tracking.MlflowClient().search_experiments()
    return jsonify([exp.name for exp in experiments])

@app.route('/experiment/<experiment_id>/runs', methods=['GET'])
def get_runs(experiment_id):
    runs = mlflow.search_runs(experiment_ids=[experiment_id])
    print(runs)

    return jsonify(runs.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
