from datetime import date, datetime
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
from math import floor
import hull

app = Flask(__name__)
cred = credentials.Certificate('./fbkey.json')
default_app = initialize_app(cred)
db = firestore.client()
transaction = db.transaction()
SQUARE_SIZE = 0.002

def determine_anchor_id(longitude, latitude):
    anchor_latitude = floor(latitude / SQUARE_SIZE) * SQUARE_SIZE
    anchor_longitude = floor(longitude / SQUARE_SIZE) * SQUARE_SIZE
    return (anchor_longitude, anchor_latitude)


@app.route("/write_stream_session", methods=['POST'])
def write_stream_session():
    stream_session_ref = db.collection("stream-sessions")
    try:
        # extract fields
        data = request.get_json()
        userId = data['userId']
        streamId = data['streamId']
        videoCodec = data['videoCodec']
        audioCodec = data['audioCodec']
        videoResolution = data['videoResolution']
        server = data['server']
        duration = data['duration']
        modemCount = data['modemCount']
        unstableEvents = data['unstableEvents']

        # POSIX/UNIX timestamp?
        startDate = data['startDate']
        endDate = data['endDate']
        startDate = datetime.fromtimestamp(startDate)
        endDate = datetime.fromtimestamp(endDate)

        stream_session_ref.add({
            'userId': userId,
            'streamId': streamId,
            'videoCodec': videoCodec,
            'audioCodec': audioCodec,
            'videoResolution': videoResolution,
            'server': server,
            'duration': duration,
            'modemCount': modemCount,
            'unstableEvents': unstableEvents,
            'startDate': startDate,
            'endDate': endDate,
            'timestamp': firestore.SERVER_TIMESTAMP
        })

        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@firestore.transactional
def update_bin_transaction(transaction, doc_ref, anchor_lng, anchor_lat, bitrate, audio_bitrate, lng, lat):
    snapshot = doc_ref.get(transaction=transaction)
    if snapshot.exists:
        # update existing bin
        transaction.update(doc_ref, {
            "totalBitrate": snapshot.get("totalBitrate") + bitrate,
            "totalAudioBitrate": snapshot.get("totalAudioBitrate") + audio_bitrate,
            "count": snapshot.get("count") + 1,
            "points": firestore.ArrayUnion([f"{lng},{lat}"]),
            "timestamp": firestore.SERVER_TIMESTAMP
        })
    else:
        # create a new bin
        transaction.set(doc_ref, {
            "anchorLongitude": anchor_lng,
            "anchorLatitude": anchor_lat,
            "totalBitrate": bitrate,
            "totalAudioBitrate": audio_bitrate,
            "count": 1,
            "points": [f"{lng},{lat}"],
            "timestamp": firestore.SERVER_TIMESTAMP
        })


@app.route("/write_datapoints", methods=['POST'])
def add_datapoints():
    bins_ref = db.collection("bins")
    datapoint_ref = db.collection("streams")
    stream_key_ref = db.collection("stream-keys")
    try:
        
        # lookup userid from uuid, the stream key
        stream_key = request.args.get('stream_key')
        if stream_key == None:
            return jsonify({"success": False}), 400
        
        userId = stream_key_ref.document(stream_key)
        if not userId.exists:
            return jsonify({"success": False}), 500

        datapoints = request.get_json()
        for datapoint in datapoints:
            # extract fields
            streamId = datapoint['streamId']
            modems = datapoint['modems']
            latitude = datapoint['latitude']
            longitude = datapoint['longitude']
            bitrate = datapoint['bitrate']
            audio_bitrate = datapoint['audioBitrate']
            fps = datapoint['fps']
            ping = datapoint['ping']
            streamTitle = datapoint['streamTitle']
            startDate = datapoint['startDate']
            endDate = datapoint['endDate']
            startDate = datetime.fromtimestamp(startDate)
            endDate = datetime.fromtimestamp(endDate)

            # write to "streams" collection
            datapoint_ref.add({
                "userId": userId,
                "streamId": streamId,
                "modems": modems,
                "latitude": latitude,
                "longitude": longitude,
                "bitrate": bitrate,
                "audioBitrate": audio_bitrate,
                "fps": fps,
                "ping": ping,
                "streamTitle": streamTitle,
                "startDate": startDate,
                "endDate": endDate,
                "timestamp": firestore.SERVER_TIMESTAMP
            })
            
            # uppper left corner will determine the square/bin of this datapoint
            anchor_longitude, anchor_latitude = determine_anchor_id(longitude, latitude)
            anchor_id = f"lng:{anchor_longitude},lat:{anchor_latitude}"
            doc_ref =  bins_ref.document(anchor_id)
            update_bin_transaction(transaction, doc_ref, anchor_longitude, anchor_latitude, bitrate, audio_bitrate, longitude, latitude)
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
    datapoint_ref = db.collection("streams")
    stream_key_ref = db.collection('stream-keys')
    try:

        # lookup userid from uuid, the stream key
        stream_key = request.args.get('stream_key')
        if stream_key == None:
            return jsonify({"success": False}), 400
        
        userId = stream_key_ref.document(stream_key)
        if not userId.exists:
            return jsonify({"success": False}), 500

        data = request.get_json()

        # extract fields
        streamId = data['streamId']
        modems = data['modems']
        latitude = data['latitude']
        longitude = data['longitude']
        bitrate = data['bitrate']
        audio_bitrate = data['audioBitrate']
        fps = data['fps']
        ping = data['ping']
        streamTitle = data['streamTitle']
        startDate = data['startDate']
        endDate = data['endDate']
        startDate = datetime.fromtimestamp(startDate)
        endDate = datetime.fromtimestamp(endDate)

        # write to "streams" collection
        datapoint_ref.add({
            "userId": userId,
            "streamId": streamId,
            "modems": modems,
            "latitude": latitude,
            "longitude": longitude,
            "bitrate": bitrate,
            "audioBitrate": audio_bitrate,
            "fps": fps,
            "ping": ping,
            "streamTitle": streamTitle,
            "startDate": startDate,
            "endDate": endDate,
            "timestamp": firestore.SERVER_TIMESTAMP
        })
            
        # uppper left corner will determine the square/bin of this datapoint
        anchor_longitude, anchor_latitude = determine_anchor_id(longitude, latitude)
        anchor_id = f"lng:{anchor_longitude},lat:{anchor_latitude}"

        # pull the document from firebase with that anchor_id
        doc_ref = bin_ref.document(anchor_id)
        update_bin_transaction(transaction, doc_ref,  anchor_longitude, anchor_latitude, bitrate, audio_bitrate, longitude, latitude)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


def convert_to_point_geojson(data):
    points = []
    for b in data:
        point = {
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
        points.append(point)
    return {"type": "FeatureCollection", "features": points}


def convert_to_polygon_geojson(data):
    polygons = []
    for b in data:
        points = b["points"]
        shape = hull.convex(points)
        polygon = {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [shape]
            },
            "properties": {
                "avgBitrate": b['avgBitrate'],
                "avgAudioBitrate": b['avgAudioBitrate']
            }
        }
        polygons.append(polygon)
    return {"type": "FeatureCollection", "features": polygons}


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
            "avgAudioBitrate": avg_audio_bitrate,
            "points": points
        })

    return preprocess


@app.route('/point_bitrate_heatmap', methods=['GET'])
def point_heat_map():
    try:
        # get all bins
        data = get_all_bins()

        # convert the process data into an proper geojson  
        formatted = convert_to_point_geojson(data)
        return jsonify(formatted), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/polygon_bitrate_heatmap', methods=['GET'])
def polygon_heat_map():
    """
        read() : Fetches bin documents from Firestore collection as JSON.
    """
    try:
        # get all bins
        data = get_all_bins()

        # convert the process data into an proper geojson  
        formatted = convert_to_polygon_geojson(data)
        return jsonify(formatted), 200
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


# @app.route('/setbins', methods=['POST'])
# def setbins():
#     try:
#         anchors = set() 
#         for lng in range(-180, 180, 1):
#             for lat in range(-90, 90, 1):
#                 a_tuple = determine_anchor_id(lng, lat)
#                 anchors.add(a_tuple)
#         print(anchors)
#         print(f"there are {len(anchors)} anchors")

#         # write the bins to database
#         write_anchors(anchors)
#         return "<p>Hello, World!</p>" 


#     except Exception as e:
#         return f"An Error Occured: {e}"