import {Storage} from '@ionic/storage';
import { Injectable } from '@angular/core';



export interface al{
  id: number,
  nombre: string,
  n1: number,
  n2: number,
  N1: number,
  N2: number,
  N: number,
  n: number,
  V: number,
  D: number,
  L: number,
  E: number,
  T: number
}

const ITEM_KEY  = 'my_items';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage){ }

  //crete
  addItem(item: al): Promise<any>{
    return this.storage.get(ITEM_KEY).then((items: al[]) =>{
      if(items){
        items.push(item);
        return this.storage.set(ITEM_KEY, items);
      }else{
        return this.storage.set(ITEM_KEY, [item]);
      }
    });
  }

  //read
  getItems(): Promise<al[]>{
    return this.storage.get(ITEM_KEY);
  }

  //delete
  deleteItem(id: number): Promise<al> {
    return this.storage.get(ITEM_KEY).then((items: al[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let toKeep: al[] = [];
 
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEM_KEY, toKeep);
    });
  }

}
