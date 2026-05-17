from flask import Blueprint, request

from services.soap_service import ServicosSoap
from utils.response import success, error

soap_bp = Blueprint(
    "soap",
    __name__
)


@soap_bp.route("/operacoes")
def operacoes():

    try:

        data = ServicosSoap.get_operacoes()

        return success(data)

    except Exception as e:

        return error(str(e))


@soap_bp.route("/<metodo>", methods=["POST"])
def executar(metodo):

    try:

        payload = request.get_json() or {}

        data = ServicosSoap.executar(
            metodo,
            payload
        )

        return success(data)

    except Exception as e:

        return error(str(e))