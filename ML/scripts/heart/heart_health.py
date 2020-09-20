import numpy as np
import  pandas as pd
import pickle



def helth(age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal):
    ENTRY_DICT = {
        "age": age,
        "sex": sex,
        "cp": cp,
        "trestbps": trestbps,
        "chol": chol,
        "fbs": fbs,
        "restecg": restecg,
        "thalach": thalach,
        "exang": exang,
        "oldpeak": oldpeak,
        "slope": slope,
        "ca": ca,
        "thal": thal
    }
    patient = pd.DataFrame.from_dict(ENTRY_DICT, orient='index')
    arr = patient.values
    arr = arr.flatten()
    arr = arr.reshape(1, -1)
    # print(arr)
    with open("heart.pickle", 'rb') as f:
        rf = pickle.load(f)
    # print(patient.values.flatten(), "\n\n\n")
    result = rf.predict(arr)
    if result == 0:
        return "healthy"
    else:
        return "not healthy"



# if __name__ == "__main__":
#     main(age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal)