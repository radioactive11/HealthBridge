import os
import cv2
import numpy as np
from tensorflow.keras.models import model_from_json

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
RESULT_LIST = ["Positive, Bacterial", "Negative", "Positive, Viral"]


def create_model(model_file):
    with open(model_file, "r") as json_file:
        loaded_model_json = json_file.read()
        loaded_model_json = model_from_json(loaded_model_json)
    return loaded_model_json


def run_predictions(img_name):
    model = create_model("scripts/pneumonia/utils/pneumonia_model.json")
    model.load_weights("scripts/pneumonia/utils/pneumonia_weights.h5")
    path_to_img = os.path.join("scripts/pneumonia/UPLOAD_IMG", img_name)
    
    img = cv2.imread(path_to_img)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (200, 200))
    res = np.argmax(model.predict(img[np.newaxis, :, :]))
    if res == 0:
        disease_type = "Positive, Bacterial"

    elif res == 1:
        disease_type = "Negative"

    else:
        disease_type = "Positive, Viral"

    RESULT_DICT = {"name": path_to_img, "disease_type": disease_type}
    return RESULT_DICT



