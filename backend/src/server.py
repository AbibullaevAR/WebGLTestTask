from flask import Flask, render_template, request, abort

from marshmallow import Schema, fields, ValidationError, validate
from flask_cors import CORS

from services import getConeData

app = Flask(__name__, static_folder="assets")
CORS(app)

@app.route('/')
def page():
    return render_template('index.html')

@app.route('/api/coneParams', methods=['GET'])
def coneParams():
    schema = Schema.from_dict(
        {
            'height': fields.Integer(required=True, validate=validate.Range(min=1, max=50)), 
            'radius': fields.Integer(required=True, validate=validate.Range(min=1, max=30)), 
            'segments': fields.Integer(required=True, validate=validate.Range(min=3))
        }
    )
    try:
        reqData = schema().load(request.args)
    except ValidationError as e:
        abort(400)

    conePositions, coneNormals = getConeData(**reqData)

    return {'conePositions': conePositions, 'coneNormals': coneNormals}

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
