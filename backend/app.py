from flask import Flask
from flask_cors import CORS

from routes.soap_routes import soap_bp

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "*"
        }
    }
)

app.register_blueprint(
    soap_bp,
    url_prefix="/api/soap"
)


@app.route("/health")
def health():

    return {
        "status": "online"
    }


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )