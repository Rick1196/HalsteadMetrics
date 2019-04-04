import { Component } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { AnalisisService } from '../services/analisis.service';
import { StorageService, al } from '../services/storage.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'] 
})
export class Tab1Page {
  text: any;
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
  //url: string;
  constructor(private toastController: ToastController,private fileChooser: FileChooser,private filePath: FilePath, private file: File,private analizador: AnalisisService, private storage: StorageService){}
  select(){
    this.fileChooser.open()
  .then(uri =>{
    this.filePath.resolveNativePath(uri)
    .then(entry => {
      this.file.resolveDirectoryUrl(entry.substring(0, entry.lastIndexOf('/'))).then(res => {
        let name = entry.split('/')[entry.split('/').length -1];
        this.file.getFile(res, name,  { create: false })
          .then(cont =>{
            this.nombre = name.replace('.py','');
            this.file.readAsText(cont.nativeURL.replace(cont.nativeURL.split('/')[cont.nativeURL.split('/').length - 1] , ''), cont.name).then(txt =>{
              this.text = txt;
              this.analizar();
              //this.url = entry.substring(0, entry.lastIndexOf('/'));
            }).catch(err =>{ 
              this.text = cont.nativeURL.replace(cont.nativeURL.split('/')[cont.nativeURL.split('/').length - 1], '')
              //this.url = cont.nativeURL.replace(cont.nativeURL.split('/')[cont.nativeURL.split('/').length - 1], '');
            })
          }).catch(err => {this.text = JSON.stringify(entry.substring(0, entry.lastIndexOf('/')))+'\n'+name+'\n'})
      }).catch(err => this.text= JSON.stringify(err)+"numero 2")
    })
    .catch(err => console.log(err));

  })
  .catch(e => console.log(e));
  }

  addItem() {
    this.newItem.id = Date.now();

    this.storage.addItem(this.newItem).then(item => {
      this.newItem = <al>{};
      this.showToast(`Analisis ${this.nombre} registrado!`)
      //this.loadItems(); // Or add it to the array directly
    });
  }

  private analizar(){
    
    this.N = this.analizador.analiza(this.text);
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
    this.newItem.n2 = parseInt(this.n2);
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

}

