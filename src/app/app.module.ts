import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import {AnalisisService} from './services/analisis.service';
import {StorageService, al} from './services/storage.service';
import { IonicStorageModule } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import {Component, ViewChild} from '@angular/core';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    FileChooser,
    File,
    FilePath,
    AnalisisService,
    SQLite,
    StorageService,
    Storage,
    ToastController,
    Platform,
    IonicStorageModule,
    Component,
    ViewChild,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
