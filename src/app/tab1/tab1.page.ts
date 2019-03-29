import { Component } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'] 
})
export class Tab1Page {
  text: any;
  constructor(private fileChooser: FileChooser,private filePath: FilePath, private file: File){}
  select(){
    this.fileChooser.open()
  .then(uri =>{
    this.filePath.resolveNativePath(uri)
    .then(entry => {
      this.file.resolveDirectoryUrl(entry.substring(0, entry.lastIndexOf('/'))).then(res => {
        let name = entry.split('/')[entry.split('/').length -1];
        this.file.getFile(res, name,  { create: false })
          .then(cont =>{
            this.file.readAsText(cont.nativeURL.replace(cont.nativeURL.split('/')[cont.nativeURL.split('/').length - 1] , ''), cont.name).then(txt =>{
              this.text = txt;
            }).catch(err => this.text = JSON.stringify(err)+'\n'+JSON.stringify(cont)+'\n')
          }).catch(err => this.text = JSON.stringify(err)+'\n'+name+'\n')
      }).catch(err => this.text= JSON.stringify(err)+"numero 2")
    })
    .catch(err => console.log(err));

  })
  .catch(e => console.log(e));
  }
}

