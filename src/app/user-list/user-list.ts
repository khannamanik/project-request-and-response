import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { Employee } from '../employee';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { DobagePipe } from "../dobage-pipe";

@Component({
  selector: 'app-user-list',
  imports: [DatePipe, RouterLink, FormsModule, DobagePipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {
  destroyref = inject(DestroyRef);
  values = '';
  confirm = signal(false);
  private service = inject(Employee);
  error = signal('')
  isfetching = signal(false);
  list:any[] = [];
  // filtervalue=signal<any[]>([]);
    getmethod(){
      this.isfetching.set(true)
     let subscription = this.service.userlist().subscribe({
        next:(val)=>{
         this.list = val;
         console.log(this.list)
        },
        error:(err)=>{
             this.error.set(err.message);
        },
        complete:()=>{
         this.isfetching.set(false);
        }
    })
     this.destroyref.onDestroy(()=>{
          subscription.unsubscribe();
        })
    }
    ngOnInit(){
      this.getmethod();
    }
    onfilterchange(){
        if (this.values === 'age') {
          this.list.sort((a,b)=>(new Date().getFullYear()-new Date(b.dob).getFullYear())-(new Date().getFullYear()-new Date(a.dob).getFullYear()));
          
        }
        else if (this.values === 'date') {
          this.list.sort((a,b)=>  new Date(b.date).getTime()-new Date(a.date).getTime());
          
        }
        else {
          this.list.sort((a,b)=> a.id - b.id)
        }
    }
    deleteuser(id:string){

      let confirms = confirm(`Are you sure, you want to remove this user with ${id} id from dataset?`);
      if (confirms) {
       let subscription =   this.service.deletedata(id).subscribe({
          next:()=>{
            this.confirm.set(true);
            setTimeout(() => this.confirm.set(false), 3000);
          },
          complete:()=>this.getmethod()
        })
        this.destroyref.onDestroy(()=>{
          subscription.unsubscribe();
        })
      }
    }

    router = inject(Router);
    updateUser(id:string){

    let confirms =  confirm(`want to update the user with id:${id} `);
    if (confirms) {
      let stored = this.list.filter((e)=>e.id === id);
      this.router.navigate(['/updateinfo'],{state:stored});
    }
    }
}
