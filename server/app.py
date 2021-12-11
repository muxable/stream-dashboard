from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
from math import floor

app = Flask(__name__)


cred = credentials.Certificate('./fbkey.json')
default_app = initialize_app(cred)
db = firestore.client()
transaction = db.transaction()
SQUARE_SIZE = 90

def determine_anchor_id(longitude, latitude):
    anchor_latitude = floor(latitude / SQUARE_SIZE) * SQUARE_SIZE
    anchor_longitude = floor(longitude / SQUARE_SIZE) * SQUARE_SIZE
    return (anchor_longitude, anchor_latitude)


@firestore.transactional
def update_bin_transaction(transaction, doc_ref, bitrate, audio_bitrate):
    snapshot = doc_ref.get(transaction=transaction)
    transaction.update(doc_ref, {
        "totalBitrate": snapshot.get("totalBitrate") + bitrate,
        "totalAudioBitrate": snapshot.get("totalAudioBitrate") + audio_bitrate,
        "count": snapshot.get("count") + 1,
        "timestamp": firestore.SERVER_TIMESTAMP
    })


@app.route("/write_datapoints", methods=['POST'])
def add_datapoints():
    bins_ref = db.collection("bins")
    try:
        datapoints = request.get_json()
        for datapoint in datapoints:
            latitude = datapoint['latitude']
            longitude = datapoint['longitude']
            bitrate = datapoint['bitrate']
            audio_bitrate = datapoint['audioBitrate']
            
            # uppper left corner will determine the square/bin of this datapoint
            anchor_longitude, anchor_latitude = determine_anchor_id(longitude, latitude)
            anchor_id = f"lng:{anchor_longitude},lat{anchor_latitude}"
            doc_ref =  bins_ref.document(anchor_id)
            update_bin_transaction(transaction, doc_ref, bitrate, audio_bitrate)
        return jsonify({"success": True}), 200

    except Exception as e:
        return f"An Error Occured: {e}"


# For writing a single datapoint
@app.route('/write_datapoint', methods=['POST'])
def add_datapoint():
    """
        create() : Add document to Firestore collection with request body.
    """

    bin_ref = db.collection("bins")
    try:
        # extract fields
        latitude = request.json['latitude']
        longitude = request.json['longitude']
        bitrate = request.json['bitrate']
        audio_bitrate = request.json['audioBitrate']

        # uppper left corner will determine the square/bin of this datapoint
        anchor_longitude, anchor_latitude = determine_anchor_id(longitude, latitude)
        anchor_id = f"lng:{anchor_longitude},lat{anchor_latitude}"

        # pull the document from firebase with that anchor_id
        doc_ref = bin_ref.document(anchor_id)

        update_bin_transaction(transaction, doc_ref, bitrate, audio_bitrate)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


def convert_to_point_geojson(data):
    points = []
    for b in data:
        data = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [b["longitude"], b["latitude"]]
            },
            "properties": {
                "avgBitrate": b['avgBitrate'],
                "avgAudioBitrate": b['avgAudioBitrate']
            }
        }
        points.append(data)
    return {"type": "FeatureCollection", "features": points}


def convert_to_polygon_geojson():
    pass


def get_all_bins():
    """
        id": "lng:42,lat:13",
        "anchorLongitude": 123,
        "anchoLatitude": 12,
        "totalBitrate": 1234,  
        "totalAudioBitrate": 1324,
        "count": 1234,
        "points": [{longitude: 2, latitude: 3, bitrate: 2, audioBitrate: 14}, {...}, {...}]
    """
    bin_ref = db.collection("bins")
    bins = bin_ref.get()

    # get bins in json format
    bins = [b.to_dict() for b in bins]

    # preprocess all bins
    preprocess = []
    for b in bins:
        _id = b['id']
        anchor_longitude = b['anchorLongitude']
        anchor_latitude = b['anchorLatitude']
        total_bitrate = b['totalBitrate']
        total_audio_bitrate = b['totalAudioBitrate']
        count = b['count']
        points = b['points']

        avg_bitrate = 0
        avg_audio_bitrate = 0
        # using the center of the square as the point for showing up on the heatmap
        longitude = anchor_longitude + (SQUARE_SIZE // 2)
        latitude = anchor_latitude - (SQUARE_SIZE // 2)

        if count > 0:
            avg_bitrate = total_bitrate / count        
            avg_audio_bitrate = total_audio_bitrate / count

        preprocess.append({
            "longitude": longitude,
            "latitude": latitude,
            "avgBitrate": avg_bitrate,
            "avgAudioBitrate": avg_audio_bitrate
        })
    # use convext hull to process each bin if we like to use polygon for the heatmap
    # ######################################

    # convert the process data into an proper geojson  
    formatted = convert_to_point_geojson(preprocess)
    return formatted


@app.route('/point_bitrate_heatmap', methods=['GET'])
def read():
    """
        read() : Fetches bin documents from Firestore collection as JSON.
    """
    try:
        # get all bins
        data = get_all_bins()
        return jsonify(data), 200
    except Exception as e:
        return f"An Error Occured: {e}"


def write_anchors(anchors):
    for anchor in anchors:
        anchor_longitude, anchor_latitude = anchor
        data = {
            "id": f"lng:{anchor_longitude},lat:{anchor_latitude}",
            "anchorLongitude": anchor_longitude,
            "anchorLatitude": anchor_latitude,
            "totalBitrate": 0,  
            "totalAudioBitrate": 0,
            "count": 0,
            "points": []
        }
        db.collection("bins").document(f"lng:{anchor_longitude},lat:{anchor_latitude}").set(data)
    return


@app.route('/setbins', methods=['POST'])
def setbins():
    try:
        anchors = set() 
        for lng in range(-180, 180, 1):
            for lat in range(-90, 90, 1):
                a_tuple = determine_anchor_id(lng, lat)
                anchors.add(a_tuple)
        print(anchors)
        print(f"there are {len(anchors)} anchors")

        # write the bins to database
        write_anchors(anchors)
        return "<p>Hello, World!</p>" 


    except Exception as e:
        return f"An Error Occured: {e}"