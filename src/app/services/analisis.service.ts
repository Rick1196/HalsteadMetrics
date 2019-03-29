import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {


  palabras_reservadas: string[];
  operadores:string [];
  n1: string[];
  n2: string[];
  N1: string[];
  N2: string[];
  N: number;
  n: number;
  V: number;
  D: number;
  L: number;
  E: number;
  T: number;
  constructor() {
    this.operadores = [
      '=',
      '!',
      '<',
      '>',
      '+',
      '-',
      '*',
      '/',
      '%'
    ];
    this.palabras_reservadas =  [                
      'elif',                
      'if',                  
      'print',
      'as',                  
      'else',                
      'import',              
      'raise',
      'assert',              
      'except',              
      'in',                  
      'return',
      'break',               
      'exec',                
      'is',                  
      'try',
      'class',               
      'finally',             
      'lambda',              
      'while',
      'continue',            
      'for',                                  
      'with',
      'def',                 
      'from',                
      'or',                  
      'yield',
      'del',                 
      'global',              
      'pass',
      'and', 
      'not',
      'or'
    ];
    this.n1 = [];
    this.n2 = [];
    this.N1 = [];
    this.N2 = [];
    this.N = 0.0;
    this.n = 0.0;
    this.V = 0.0;
    this.D = 0.0;
    this.L = 0.0;
    this.E = 0.0;
    this.T = 0.0;
   }

  analiza(codigo: string){
    var code = this.tokenize(codigo);
    var tokens = code.match(/\S+/g);
    this.obtenOperadores(JSON.stringify(tokens));
    this.obtenerOperandos(tokens);
    this.N = this.N1.length + this.N2.length;
    this.n = this.n1.length + this.n2.length;
    this.V = this.N * Math.log2(this.n);
    this.D =  (this.n1.length/2) * (this.N2.length/this.n2.length);
    this.L = 1/this.D;
    this.E = this.V*this.D;
    this.T =  this.E/18;
    return JSON.stringify(this.N);
  }

  esOp(item: string){
    this.operadores.forEach(element => {
      if(element === item){
        return true;
      }
    });
    return false;
  }

  esPal(item: string){
    this.palabras_reservadas.forEach(element => {
      if(element == item){
        return true;
      }
    });
    return false;
  }

  obtenOperadores(token: string){
    for (let index = 0; index < token.length; index++) {
      if(this.operadores.includes(token[index])){
        this.N1.push(token[index])
        if(!this.n1.includes(token[index])){
          this.n1.push(token[index])
        }
      }
    }
  }

  obtenerOperandos(tokens: string[]){
    var index = 0;
    while(index < tokens.length){
        if(tokens[index].length == 0 && (!this.esOp(tokens[index].replace(':','').replace('(','').replace(')','')))){
          this.N2.push(tokens[index].replace(':','').replace('(','').replace(')',''))
          if(!this.n2.includes(tokens[index].replace(':','').replace('(','').replace(')',''))){
            this.n2.push(tokens[index].replace(':','').replace('(','').replace(')',''));
          }
          index += 1;
        }else if (tokens[index].substring( 0, tokens[index].length ) === 'print') {
          var str = ''
          this.N2.push(tokens[index].replace(':','').replace('(','').replace(')',''));
          if(!this.n2.includes(tokens[index].replace(':','').replace('(','').replace(')',''))){
            this.n2.push(tokens[index].replace(':','').replace('(','').replace(')',''));
          }
          let j = index + 1;
          for ( j ; j < tokens.length; j++) {
            if( tokens[j].substring( tokens.length - ')'.length, tokens[j].length ) === ')'){
              str = str + tokens[j];
              break;
            }else{
              str = str + tokens[j];
            }
            
          }
          index += (index - j);
        } else {
          this.palabras_reservadas.forEach(item => {
          if(tokens[index].includes(item)){
              this.N2.push(item)
              if(!this.n2.includes(item)){
                this.n2.push(item);
              }
            }
          });
          index += 1;
        }
    };
  }

  tokenize(code: string){
    var res = '';
    res = code.replace('\n', ' ');
    res = res.replace('\t',' ');
    res = res.replace('(', ' ( ');
    res.replace(')', ' ) ');
    res.replace(',', ' , ')
    res.split(" ");
    return res
  }
}
