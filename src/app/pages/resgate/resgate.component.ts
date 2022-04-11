import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, find, map, switchMap } from 'rxjs/operators';
import { Investimento } from 'src/app/shared/interfaces/investimentos.interface';
import { InvestimentoService } from 'src/app/shared/services/investimentos.service';

@Component({
  selector: 'app-rescue',
  templateUrl: './resgate.component.html',
  styleUrls: ['./resgate.component.scss']
})
export class ResgateComponent implements OnInit {

  public investimentoNome : any;
  public investimento : any;  
  public valorTotal: number = 0.0;

  constructor(
    private route: ActivatedRoute,
    private investimentoService: InvestimentoService,
    private router: Router
  ) { }

  ngOnInit(): void {    
    this.route.paramMap      
      .subscribe( paramMap => {
        this.investimentoNome = paramMap.get('nome');
        this.get();
      }
    )
  }

  get() {    
    this.investimentoService.investimentos$
    .subscribe(r => {
      this.investimento = r.find(r => r.nome === this.investimentoNome);
      if(!!!this.investimento || this.investimento.indicadorCarencia === 'S') {
        this.router.navigate([""]);
      }
    })
  }

}
