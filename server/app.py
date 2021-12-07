from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
from math import floor

app = Flask(__name__)


cred = credentials.Certificate('./fbkey.json')
default_app = initialize_app(cred)
db = firestore.client()
SQUARE_SIZE = 0.2


def determine_anchor_id(longitude, latitude):
    anchor_latitude = floor(latitude / SQUARE_SIZE) * SQUARE_SIZE
    anchor_longitude = floor(longitude / SQUARE_SIZE) * SQUARE_SIZE
    return f'lng:{anchor_longitude},lat:{anchor_latitude}'


# For writing a bunch of an array of datapoints
@app.route("/write_datapoints", method=['POST'])
async def write_datapoints():
    # TODO: implmenetation
    pass
    


# For writing a single datapoint
@app.route('/write_datapoint', methods=['POST'])
async def add_datapoint():
    """
        create() : Add document to Firestore collection with request body.
    """

    bin_ref = db.collection("bins")
    try:
        # extract fields
        latitude = request.json['latitude']
        longitude = request.json['longitude']
        bitrate = request.json['bitrate']
        audio_bitrate = request.json['audio_bitrate']

        # uppper left corner will determine the square/bin of this datapoint
        anchor_id = determine_anchor_id(longitude, latitude)

        # pull the document from firebase with that anchor_id
        bin_doc = await bin_ref.document(anchor_id).get()
        bin_doc['bitrate'] += bitrate
        bin_doc['audio_bitrate'] += audio_bitrate
        bin_doc['data_count'] += 1

        # TODO: write back with updated data
        
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


async def get_all_bins():
    bin_ref = db.collection("bins")
    bins = bin_ref.get()
    
    # process all bins
    # TODO: process bins 

    # use convext hull to process each bin if we like to use polygon for the heatmap

    # convert the process data into an proper geojson  
    # TODO: generate geojson for frontend rendering

    return bins


@app.route('/getbins', methods=['GET'])
async def read():
    """
        read() : Fetches bin documents from Firestore collection as JSON.
    """
    try:
        # all bins
        bins = await get_all_bins()
        return jsonify(bins), 200
    except Exception as e:
        return f"An Error Occured: {e}"