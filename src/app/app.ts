import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  lang:string='';
  ngOnInit(){
    this.lang = localStorage.getItem('lang')||'en';
  }
  // constructor(private translateserv:TranslateService){

  // }
  caughtchange(lang:Event){
     let language = (lang.target as HTMLSelectElement).value ;
     localStorage.setItem('lang',language);
    //  this.translateserv.use(this.lang);
    //  console.log(language);
  }
}
