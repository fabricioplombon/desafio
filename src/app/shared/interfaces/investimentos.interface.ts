export interface Lista {
    listaInvestimentos: Investimento[];
}

export interface Investimento {
    nome: string;
    objetivo: string;
    saldoTotal: number;  
    indicadorCarencia: string;
    acoes?: Acoes[];
}

export interface Acoes {
    id: string;
    nome: string;
    percentual: number;
    valor?: number;
}