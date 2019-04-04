import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


//files
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import {StorageService} from './services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sqlite: SQLite,
    private storage: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.initializeDB();
    });
  }
/*
  private initializeDB(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
    
       this.storage.setDatabase(db);
       this.storage.createTable();
    
    
      })
      .catch(e => console.log(e));
  }*/
}
