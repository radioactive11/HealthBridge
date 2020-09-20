from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
from scripts.pneumonia.pneumonia_detection import run_predictions
from scripts.cancer.cancer import predict_cancer
from scripts.medNames.medNames import scrape
import shutil
from PIL import Image
import os


app = Flask(__name__)
CORS(app)
api = Api(app)



class MedicineName(Resource):
    def post(self):
        generic_name = request.json["generic_name"]
        medicines = scrape(generic_name)
        return medicines


api.add_resource(MedicineName, "/generic_name")


class PneumoniaDetection(Resource):
    def post(self):
        if os.path.exists("scripts/pneumonia/UPLOAD_IMG/"):
            shutil.rmtree("scripts/pneumonia/UPLOAD_IMG/")
        os.mkdir("scripts/pneumonia/UPLOAD_IMG")
        image = request.files["images"]
        image_name = image.filename
        PATH_UPLOAD = os.path.join(os.getcwd(), "scripts/pneumonia/UPLOAD_IMG")
        image.save(os.path.join(PATH_UPLOAD, image_name))
        images = os.listdir("scripts/pneumonia/UPLOAD_IMG")
        image = images[0]
        result = run_predictions(image)
        os.remove(os.path.join(PATH_UPLOAD, image_name))
        return result


api.add_resource(PneumoniaDetection, "/pneumonia")


class Cancer(Resource):
    def post(self):
        if os.path.exists("scripts/cancer/UPLOAD_IMG/"):
            shutil.rmtree("scripts/cancer/UPLOAD_IMG/")
        os.mkdir("scripts/cancer/UPLOAD_IMG")
        os.mkdir("scripts/cancer/UPLOAD_IMG/image")
        image = request.files["images"]
        image_name = image.filename
        PATH_UPLOAD = os.path.join(os.getcwd(), "scripts/cancer/UPLOAD_IMG/image")
        image.save(os.path.join(PATH_UPLOAD, image_name))

        result = predict_cancer("scripts/cancer/UPLOAD_IMG")
        shutil.rmtree("scripts/cancer/UPLOAD_IMG")
        return result[0]


api.add_resource(Cancer, "/cancer")


if __name__ == "__main__":
    app.run(debug=True,port=5000)