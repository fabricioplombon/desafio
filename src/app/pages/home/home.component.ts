import { Component, OnInit } from '@angular/core';
import { Investimento } from 'src/app/shared/interfaces/investimentos.interface';
import { InvestimentoService } from 'src/app/shared/services/investimentos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public investimentos: Investimento[] = [];

  constructor( 
    private investimentoService: InvestimentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.investimentoService.investimentos$.subscribe(r => {            
      this.investimentos = r;
    })  

  } 
  
  open( investimento: Investimento) {
    const url = encodeURI(investimento.nome);
    this.router.navigate(["resgate/" + url]);
  }

}
