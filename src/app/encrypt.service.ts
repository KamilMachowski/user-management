import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() {
    
  }
  getHash(str :string, algo = "SHA-256") {
    //let strBuf = new TextEncoder('utf-8').encode(str);
    let hash = str; // crypto.subtle.digest(algo, strBuf);
    // crypto.subtle.digest().then()
      // .then(hash => {
      //   window.hash = hash;
      //   let result = '';
      //   const view = new DataView(hash);
      //   for (let i = 0; i < hash.byteLength; i += 4) {
      //     result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
      //   }
      //   return result;
      // });
    return hash;
  }
}
