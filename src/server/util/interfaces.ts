import { UUID } from "crypto";
import { Usuario } from "../model/usuario";


export interface Dict<T> {
    [index:string]:T;
  }
  
  export interface NDict<T> {
    [index:number]:T;
  }
  
  export interface JsonData {
    [index:string]: any;
  }
  
  export interface Vector2{
    x:number;
    y:number;
  }
  
  export interface ResultMessage{
    success:boolean;
    msg?:string;
    type:string;
    error?:string;
    val?:JsonData;
  }


  export interface PossuiCriador {

    criador:string;

  }
  
export enum Medida {
  g = 'g',
  mg = 'mg',
  kg = 'kg',
  ug = 'ug',
  l = 'l',
  ml = 'ml',
  kcal = 'kcal',
  kJ = 'kJ',
  pct = 'pct',
  variavel = 'variavel'
}

export enum TipoRefeicao {
  CAFEMANHA = 'cafedamanha',
  ALMOCO = 'almoco',
  CAFETARDE = 'cafetarde',
  JANTA = 'janta',
  AGUA = 'agua'
}

export enum EstadoAlimento {
  COZIDO = 'cozido',
  FRITO = 'frito',
  ASSADO = 'assado',
  CRU = 'cru'
}

export class NutrienteTipo {

    tipo:string;
    medida: Medida;
    qtMedida: number;
}

export interface Nutrientes {
    
    energia: number; //kcal
    proteina: number //g
    carboidrato: number; //g
    fibras: number; //g
    colesterol: number; //mg
    acucares?: number; //g
    indiceGlicemico?: number; //escala
    gordurasTotais?: number;
    gordurasSaturadas?: number;
    
}

export interface Ingrediente {
  alimento_id:string;
  quantidade:number;
  medida:Medida;
  criador_id:string;
}

  