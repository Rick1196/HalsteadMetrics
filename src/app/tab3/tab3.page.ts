import { Component, ViewChild } from '@angular/core';
import { ToastController, Platform, IonList } from '@ionic/angular';
//servicio de storage
import {StorageService, al} from '../services/storage.service'
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  analisis: al[] = [];
  texto: string;

  @ViewChild('mylist')mylist: IonList;

  constructor(private plt: Platform,private storage: StorageService,private toastController: ToastController){
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }   

  loadItems() {
    this.storage.getItems().then(items => {
      this.analisis = items;
    });
  }

  deleteItem(item: al) {
    this.storage.deleteItem(item.id).then(item => {
      this.showToast(`Analisis removido del historial`);
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadItems(); // Or splice it from the array directly
    });
  }



  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  ionRefresh( event ){
    console.log('Pull Event Triggered!');
    setTimeout(() => {
      this.loadItems();
      console.log('Asynv operation has ended');
      event.target.complete();
    }, 2000 );
  }

  ionPull( event ){
    console.log('ionPull Event triggered!');
  }

  ionStart( event ){

    this.loadItems();
  }

}
