import {Dict} from "./interfaces";


export function clone(obj:any):any{
  return JSON.parse(JSON.stringify(obj));
}


export class Timer {

  static async wait(time:number):Promise<any>{
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, time);
    });
  }



}
