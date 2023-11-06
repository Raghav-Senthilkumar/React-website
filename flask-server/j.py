import pandas as pd
import subprocess
import os
import base64
import pickle
from rdkit import Chem
from rdkit.Chem import Descriptors
from chempy import Substance
import joblib
import sklearn
from sklearn.metrics import mean_squared_error
import numpy as np
import pandas as pd
import pickle

import ctypes


def desc_calc():
    # Performs the descriptor calculation
    bashCommand = "java -Xms1G -Xmx2G -Djava.awt.headless=true -jar ./flask-server/PaDEL-Descriptor/PaDEL-Descriptor.jar -removesalt -standardizenitro -fingerprints -descriptortypes ./flask-server/PaDEL-Descriptor/PubchemFingerprinter.xml -dir ./ -file flask-server/descriptors_output-2.csv"
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()

desc_calc()
load_data = pd.read_table("flask-server/example_acetylcholinesterase.txt", sep=' ', header=None)
load_data.to_csv('molecule.smi', sep = '\t', header = False, index = False)
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
model = joblib.load("flask-server/hist_gradient_boosting_model-3.pkl")
df = df.iloc[:, 1:]
Xlist = list(pd.read_csv('flask-server/descriptor_list.csv').columns)
df= df[Xlist]
model = joblib.load("flask-server/hist_gradient_boosting_model-3.pkl")
df= np.array(df, dtype=np.intp)


