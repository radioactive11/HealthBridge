import math
import os
import warnings

import keras as keras
import numpy as np
import pandas as pd
from keras.applications.xception import Xception
from keras.layers import GlobalAveragePooling2D, Concatenate
from keras.layers import Input
from keras.models import Model
from keras.preprocessing.image import ImageDataGenerator

np.random.seed(777)
warnings.filterwarnings('always')
warnings.filterwarnings('ignore')


os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

def predict_cancer(image_path):
    loaded_model = keras.models.load_model('scripts/cancer/utils/xception_upto95frozen.h5', compile=False)
    loaded_model.load_weights('scripts/cancer/utils/xception_upto95frozen_weights.h5')
    cancer = []
    RESULT = []
    list_images = os.listdir(image_path)

    if len(list_images) == 0:
        cancer.append("No images")
        list_images.append("error")
        RES_DICT = {"file": "no image", "error": "error"}
        RESULT.append(RES_DICT)
        return RESULT

    img_height = 512
    img_width = 512
    batch_size = 32
    input_shape = (img_width, img_height, 3)

    test_datagen = ImageDataGenerator(rescale=1. / 255)
    test_generator_xcep = test_datagen.flow_from_directory(image_path,
                                                           target_size=(img_height, img_width),
                                                           batch_size=batch_size,
                                                           # seed=random_seed,
                                                           shuffle=False,
                                                           class_mode='categorical')

    nb_test_samples = len(test_generator_xcep.filenames)
    predict_size_test = int(math.ceil(nb_test_samples / batch_size))

    # Xception
    model = Xception(include_top=False, weights="imagenet", pooling='avg', input_tensor=Input(shape=input_shape))
    image_input = model.input
    x1 = GlobalAveragePooling2D()(model.get_layer("block4_sepconv1_act").output)  # layer_26
    x2 = GlobalAveragePooling2D()(model.get_layer("block5_sepconv1_act").output)  # layer_36
    x3 = GlobalAveragePooling2D()(model.get_layer("block14_sepconv1").output)  # layer_126
    out = Concatenate()([x1, x2, x3])
    custom_xcep_model = Model(image_input, out)

    for layer in custom_xcep_model.layers[:95]:
        layer.trainable = False

    # Saving features of the image
    bottleneck_features = custom_xcep_model.predict_generator(test_generator_xcep, predict_size_test)
    np.save('scripts/cancer/utils/bottleneck_features.npy', bottleneck_features)

    data = np.load('scripts/cancer/utils/bottleneck_features.npy')

    preds = loaded_model.predict(data)
    predictions = [i.argmax() for i in preds]

    result = []
    for i, pred in enumerate(predictions):
        if (pred == [0]):
            cancer.append("Benign")
        elif (pred == [1]):
            cancer.append("InSitu")
        elif (pred == [2]):
            cancer.append("Invasive")
        else:
            cancer.append("Normal")
    RES_DICT = {"cancer": cancer[0]}
    result.append((RES_DICT))
    return result

