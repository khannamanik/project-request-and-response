import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserList } from '../user-list/user-list';
import { Employee } from '../employee';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-a-user',
  imports: [FormsModule],
  templateUrl: './update-a-user.html',
  styleUrl: './update-a-user.css'
})
export class UpdateAUser {
  update = signal(false);
  error=''
  user:any;
  service = inject(Employee);
  router = inject(Router);
  destroyref = inject(DestroyRef);
     ngOnInit(){
      const data = history.state[0];
      const year = new Date(data.date).getUTCFullYear();
const month = new Date(data.date).toLocaleString('default', { month: 'short' });
const day = new Date(data.date).getUTCDate();
      
      let dates = `${month} ${day},${year}`;
      let dateofb = new Date(data.dob).toISOString().split('T')[0];
      let obj = {...data,date:dates,dob:dateofb};
      this.user = obj;
     }
     updateUser(){
     
      
    let subscription = this.service.updatedata(this.user).subscribe({
      next:()=>{
        this.update.set(true)
      
      setTimeout(() =>this.update.set(false) , 2000);
    },
    error:(err)=>{
       this.error = err 
    },
    complete:()=>{
       this.router.navigate(['/userlist'])
    }
     })
      this.destroyref.onDestroy(()=>{
          subscription.unsubscribe();
        })
     }
}
