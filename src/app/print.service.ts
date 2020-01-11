import { Injectable } from '@angular/core';
import { pdfMake } from 'pdfmake/build/pdfmake';
import { pdfFonts } from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() { }
  generatePdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open();
   }
}
