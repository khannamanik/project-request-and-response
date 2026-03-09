import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Body } from "./body/body";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
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
