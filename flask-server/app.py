from flask import Flask, request, jsonify
import sklearn
from sklearn.metrics import mean_squared_error
import numpy as np
import pandas as pd
import pickle
import joblib
import ctypes
import subprocess
from rdkit import Chem
from rdkit.Chem import Descriptors
import os
app = Flask(__name__)

# Load the pickled model
with open('flask-server/hist_gradient_boosting_model_best.pkl', 'rb') as model_file:
    model = joblib.load(model_file)

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        print(file)
        df = pd.read_csv(file)
        load_data = df
        load_data.to_csv('molecule.smi', sep = '\t', header = False, index = False)
        desc_calc()
        smiles = load_data.iloc[:, 0]
        print(smiles)
        nhd = []
        nha = []
        logP = []
        mol_mass =[]
        psa =[]
        rot_bonds = []
        for smile in smiles:
            mol = Chem.MolFromSmiles(smile)
            nhd.append(Descriptors.NumHDonors(mol))
            nha.append(Descriptors.NumHAcceptors(mol))
            logP.append(Descriptors.MolLogP(mol))
            mol_mass.append(Descriptors.MolWt(mol))
            psa.append(Descriptors.TPSA(mol))
            rot_bonds.append(Descriptors.NumRotatableBonds(mol))
        df = pd.read_csv("flask-server/descriptors_output-2.csv")
        df['Number of H donors'] = nhd
        df['Number of H Acceptors']= nha
        df['LogP']= logP
        df['molecular mass']=mol_mass
        df['PSA']= psa
        df['numrotbonds']=rot_bonds
        df = df.iloc[:, 1:]
        Xlist = list(pd.read_csv('flask-server/descriptor_list.csv').columns)
        df= df[Xlist]
        predictions = model.predict(df)  # Replace with your model's prediction logic
        return jsonify({'predictions': predictions.tolist()})
def desc_calc():
    # Performs the descriptor calculation
    bashCommand = "java -Xms1G -Xmx2G -Djava.awt.headless=true -jar ./flask-server/PaDEL-Descriptor/PaDEL-Descriptor.jar -removesalt -standardizenitro -fingerprints -descriptortypes ./flask-server/PaDEL-Descriptor/PubchemFingerprinter.xml -dir ./ -file flask-server/descriptors_output-2.csv"
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    os.remove("molecule.smi")
if __name__ == '__main__':
    app.run()