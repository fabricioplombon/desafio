import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Acoes, Investimento } from 'src/app/shared/interfaces/investimentos.interface';
import { InvestimentoService } from 'src/app/shared/services/investimentos.service';
import { InputComponent } from 'src/app/shared/components/input/input/input.component';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rescue',
  templateUrl: './resgate.component.html',
  styleUrls: ['./resgate.component.scss']
})
export class ResgateComponent implements OnInit {

  public investimentoNome: any;
  public investimento: Investimento | undefined;
  public saldoTotal: any;
  public valorTotal: number = 0;
  public acoesLista: Acoes[] | undefined;

  public closeResult: string | undefined;
  public error: boolean = false;
  public errorType: string = '';
  public errorList: Acoes[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private investimentoService: InvestimentoService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(paramMap => {
        this.investimentoNome = paramMap.get('nome');
        this.get();
      });
  }

  get() {
    this.investimentoService.investimentos$
      .subscribe(r => {
        this.investimento = r.find(r => r.nome === this.investimentoNome);
        if (!!!this.investimento || this.investimento.indicadorCarencia === 'S') {
          this.router.navigate([""]);
        }
        this.saldoTotal = this.investimento?.saldoTotal;
        this.acoesLista = this.investimento?.acoes?.map(a => {
          return { ...a, valor: this.calc(a.percentual) };
        });
      })
  }

  calc(porcentagem: any) {
    return (this.saldoTotal / 100) * porcentagem;
  }

  retornaValor(resposta: Acoes) {
    this.acoesLista = this.acoesLista?.map(a => {
      if (resposta.id === a.id) {
        a.resgate = resposta.resgate;
        if (this.verifica(a.valor, a.resgate)) {
          a.error = true;
        } else {
          a.error = false;
        }
      }
      return a;
    });
    this.valorTotal = this.acoesLista?.filter(a => a.resgate).map(a => a.resgate).reduce((acc: any, val: any) => {
      return acc + val;
    }, 0);
  }

  verifica(valor: any, resgate: any): boolean {
    return (resgate > valor) ? true : false;
  }

  abrirModal(content: any) {

    this.errorList = this.acoesLista?.filter(a => a.error);

    if (this.valorTotal === 0) {
      this.error = true;
      this.errorType = 'vazio';      
    } else if (this.errorList?.length) {
      this.error = true;
      this.errorType = 'excedido';      
    } else {
      this.error = false;
      this.errorType = '';      
    }

    this.modalService.open(content, { centered: true, size: 'lg' });
  }

}
