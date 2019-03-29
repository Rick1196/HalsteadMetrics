import { Component } from '@angular/core';
import { AnalisisService } from '../services/analisis.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  codigo: string;
  palabras: string;
  N: string;
  n: string;
  V: string;
  D: string;
  L: string;
  E: string;
  T: string;
  n1: string;
  n2: string;
  N1: string;
  N2: string;
  nombre: string;
  constructor(private analizador: AnalisisService){
  }

  analizar(){
    
    this.N = this.analizador.analiza(this.codigo);
    this.n = JSON.stringify(this.analizador.n);
    this.V = JSON.stringify(this.analizador.V);
    this.D = JSON.stringify( this.analizador.D);
    this.L = JSON.stringify(this.analizador.L);
    this.E = JSON.stringify(this.analizador.E);
    this.T =  JSON.stringify(this.analizador.T);
    this.n1 =  JSON.stringify(this.analizador.n1.length);
    this.n2 =  JSON.stringify(this.analizador.n2.length);
    this.N1 =  JSON.stringify(this.analizador.N1.length);
    this.N2 =  JSON.stringify(this.analizador.N2.length);
  }

}
