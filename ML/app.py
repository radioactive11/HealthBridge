from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
from scripts.pneumonia.pneumonia_detection import run_predictions
import shutil
from PIL import Image
import os

app = Flask(__name__)
CORS(app)
api = Api(app)

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


if __name__ == "__main__":
    app.run(debug=True,port=5000)