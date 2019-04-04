import { StorageService, al } from './../services/storage.service';
import { Component } from '@angular/core';
import { AnalisisService} from '../services/analisis.service';
import {ToastController} from '@ionic/angular'

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
  newItem: al = <al>{};
  constructor(private toastController: ToastController,private analizador: AnalisisService, private storage: StorageService){
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

    this.newItem.n1 = parseInt(this.n1);
    this.newItem.n2 = parseInt(this.n1);
    this.newItem.N1 = parseInt(this.N1);
    this.newItem.N2 = parseInt(this.N2);
    this.newItem.N = parseFloat(this.N);
    this.newItem.n = parseFloat(this.n);
    this.newItem.V = parseFloat(this.V);
    this.newItem.D = parseFloat(this.D);
    this.newItem.L = parseFloat(this.L);
    this.newItem.E = parseFloat(this.E);
    this.newItem.T =  parseFloat(this.T);
    this.newItem.nombre = this.nombre;
    this.addItem();
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  addItem() {
    this.newItem.id = Date.now();

    this.storage.addItem(this.newItem).then(item => {
      this.newItem = <al>{};
      this.showToast(`Analisis ${this.nombre} registrado!`)
      //this.loadItems(); // Or add it to the array directly
    });
  }

}
