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
    id?: string | undefined;
    nome?: string | undefined;
    percentual?: number | undefined;
    valor?: number;
    resgate?: number;
}