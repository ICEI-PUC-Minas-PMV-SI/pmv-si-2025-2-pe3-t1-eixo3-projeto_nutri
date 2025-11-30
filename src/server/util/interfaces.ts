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
  variavel = 'variavel',
  porcao = 'porcao'
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

export const medidaNutriente:JsonData = {
  energia: Medida.kcal,
  proteina: Medida.g,
  carboidrato: Medida.g,
  fibras: Medida.g,
  colesterol: Medida.mg,
  acucares: Medida.g,
  indiceGlicemico: Medida.variavel,
  gordurasTotais: Medida.variavel,
  gordurasSaturadas: Medida.variavel,
}

export interface Ingrediente {
  alimento_id: string;
  quantidade: number;
  medida: Medida;
}

export function conversaoMedida(quantidade:number, medidaEntrada:Medida, medidaSaida:Medida):number{
  // 🔹 Caso especial: PORÇÃO (é sempre multiplicador puro)
  if (medidaEntrada === Medida.porcao) {
    return quantidade;
  }

  // -----------------------------
  // 🔹 MASSA
  // -----------------------------
  const massaParaGramas: Record<Medida, number> = {
    [Medida.kg]: 1000,
    [Medida.g]: 1,
    [Medida.mg]: 1 / 1000,
    [Medida.ug]: 1 / 1_000_000,

    // inválidos para massa
    [Medida.l]: NaN,
    [Medida.ml]: NaN,
    [Medida.kcal]: NaN,
    [Medida.kJ]: NaN,
    [Medida.pct]: NaN,
    [Medida.variavel]: NaN,
    [Medida.porcao]: NaN,
  };

  // -----------------------------
  // 🔹 VOLUME
  // -----------------------------
  const volumeParaMl: Record<Medida, number> = {
    [Medida.l]: 1000,
    [Medida.ml]: 1,

    // inválidos para volume
    [Medida.kg]: NaN,
    [Medida.g]: NaN,
    [Medida.mg]: NaN,
    [Medida.ug]: NaN,
    [Medida.kcal]: NaN,
    [Medida.kJ]: NaN,
    [Medida.pct]: NaN,
    [Medida.variavel]: NaN,
    [Medida.porcao]: NaN,
  };

  // -----------------------------
  // 🔹 MASSA para MASSA
  // -----------------------------
  if (!isNaN(massaParaGramas[medidaEntrada]) && !isNaN(massaParaGramas[medidaSaida])) {
    const qEmGramas = quantidade * massaParaGramas[medidaEntrada];
    return qEmGramas / massaParaGramas[medidaSaida];
  }

  // -----------------------------
  // 🔹 VOLUME para VOLUME
  // -----------------------------
  if (!isNaN(volumeParaMl[medidaEntrada]) && !isNaN(volumeParaMl[medidaSaida])) {
    const qEmMl = quantidade * volumeParaMl[medidaEntrada];
    return qEmMl / volumeParaMl[medidaSaida];
  }

  // -----------------------------
  // 🔹 UNIDADES NÃO CONVERSÍVEIS
  // kcal, %, variavel, etc.
  // -----------------------------
  return 1;
}




  