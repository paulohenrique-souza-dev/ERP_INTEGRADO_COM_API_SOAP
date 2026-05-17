from soap_client import (
    listar_operacoes,
    chamar_metodo
)


class ServicosSoap:

    @staticmethod
    def pegar_operacoes():
        return listar_operacoes()

    @staticmethod
    def executar(nome_metodo, payload):
        return chamar_metodo(
            nome_metodo,
            payload
        )