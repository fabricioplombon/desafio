import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Acoes } from 'src/app/shared/interfaces/investimentos.interface';

@Component({
  selector: 'app-input',
  styles: [
    '.form-text { padding-left: .5rem; }',
    '.form-text.is-error { color: red; }',
  ],
  template: `
    <input type="text" name="valor" class="form-control" placeholder="Digite quanto quer resgatar" (keyup)="valida()" mask="separator.2" thousandSeparator="." prefix="R$ " [(ngModel)]="valor" (onchange)="handleChange.emit($event)">
    <div *ngIf="error" class="form-text is-error">O valor a resgatar não pode ser maior que {{ acoes?.valor | currency:'BRL' }}</div>
  `,
})
export class InputComponent {

  @Input() acoes: Acoes | undefined;
  @Output() handleChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() resposta = new EventEmitter();

  error: boolean = false;
  valor: any = '';

  constructor() { }

  valida() {
    if (this.acoes?.valor && parseFloat(this.valor) > this.acoes.valor) {
      this.error = true;
    } else {
      this.error = false;
    }
    this.acoes = { ...this.acoes, resgate: parseFloat(this.valor) };
    this.resposta.emit(this.acoes);
  }

}
