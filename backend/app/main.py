from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import math

app = FastAPI(title="FinanSim API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # em produção, restrinja para seu domínio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Simulacao(BaseModel):
    valor_inicial: float
    aporte: float
    taxa: float  # percentual ao mês
    meses: int

@app.post("/juros-compostos")
def calcular_juros(sim: Simulacao):
    # evita divisão por zero quando taxa == 0
    i = sim.taxa / 100.0
    n = sim.meses
    P = sim.valor_inicial
    A = sim.aporte

    if i == 0:
        montante = P + A * n
        serie = [round(P + A * t, 2) for t in range(1, n+1)]
    else:
        montante = P * (1 + i) ** n + A * (((1 + i) ** n - 1) / i)
        # gerar série mensal para gráfico
        serie = []
        for t in range(1, n+1):
            m_t = P * (1 + i) ** t + A * (((1 + i) ** t - 1) / i)
            serie.append(round(m_t, 2))

    investido = P + A * n
    rendimento = montante - investido

    return {
        "montante": round(montante, 2),
        "investido": round(investido, 2),
        "rendimento": round(rendimento, 2),
        "serie": serie,
        "meses": n
    }