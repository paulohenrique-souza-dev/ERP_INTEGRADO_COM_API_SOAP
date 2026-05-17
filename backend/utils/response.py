from flask import jsonify


def success(data=None, message="Sucesso"):
    return jsonify({
        "success": True,
        "message": message,
        "data": data
    })


def error(message="Erro interno", status=500):
    return jsonify({
        "success": False,
        "message": message
    }), status