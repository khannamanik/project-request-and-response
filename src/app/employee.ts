import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Employee {
  private httpClient = inject(HttpClient);
  list = signal<any[]>([]);
   userlist(): Observable<any[]> {
  return this.httpClient.get<any[]>('https://68f7f9c5f7fb897c6617970f.mockapi.io/api/v1/Users')
}
   senddata(body: any):Observable<any[]> {
    let httpheaders = new HttpHeaders()
    .set('Content-type','application/json')
      return this.httpClient.post<any>('https://68f7f9c5f7fb897c6617970f.mockapi.io/api/v1/Users',body,{headers:httpheaders})
   }
   deletedata(id:string):Observable<any[]>{
     let httpheaders = new HttpHeaders()
    .set('Content-type','application/json')
    return this.httpClient.delete<any>(`https://68f7f9c5f7fb897c6617970f.mockapi.io/api/v1/Users/${id}`,{headers:httpheaders});
   }
    updatedata(obj:any):Observable<any>{
      let httpheaders = new HttpHeaders()
    .set('Content-type','application/json')
      return this.httpClient.put<any>(`https://68f7f9c5f7fb897c6617970f.mockapi.io/api/v1/Users/${obj.id}`,obj,{headers:httpheaders})
    }
}
