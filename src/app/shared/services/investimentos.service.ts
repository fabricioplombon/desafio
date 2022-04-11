import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { of, first, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Investimento } from '../interfaces/investimentos.interface';

@Injectable({
    providedIn: 'root',
})
export class InvestimentoService {

    public investimentos$: Observable<Investimento[]> = this.fecthAll();
    
    constructor(private coreService: CoreService) {}

    fecthAll() {   
        return this.coreService.httpGet()
        .pipe(
            first(),
            map(r => r.response),
            filter( r => r.status === "200" ),
            map(r => r.data.listaInvestimentos),
            switchMap(res => of(res as Investimento[])),
        )
    }
}