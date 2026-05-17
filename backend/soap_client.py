from zeep import Client, Settings, Transport
from zeep.helpers import serialize_object
from requests import Session
from config import URL, TIMEOUT

session = Session()

transport = Transport(
    session=session,
    timeout=TIMEOUT
)

settings = Settings(
    strict=False,
    xml_huge_tree=True
)

client = Client(
    wsdl=WSDL_URL,
    transport=transport,
    settings=settings
)


def listar_operacoes():

    operacoes = []

    for service in client.wsdl.services.values():

        for port in service.ports.values():

            operations = port.binding._operations.values()

            for op in operations:

                operacoes.append({
                    "nome": op.name,
                    "input": str(op.input.signature()),
                    "output": str(op.output.signature())
                })

    return operacoes

def chamar_metodo(nome_metodo, params=None):

    if params is None:
        params = {}

    if not hasattr(client.service, nome_metodo):
        raise Exception(
            f"Método '{nome_metodo}' não existe"
        )

    metodo = getattr(
        client.service,
        nome_metodo
    )

    try:

        if params:
            resposta = metodo(**params)
        else:
            resposta = metodo()

        return serialize_object(resposta)

    except Exception as e:

        raise Exception(
            f"Erro SOAP em '{nome_metodo}': {str(e)}"
        )