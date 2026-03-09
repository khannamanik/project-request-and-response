import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-user',
  imports: [FormsModule],
  templateUrl: './add-new-user.html',
  styleUrl: './add-new-user.css'
})
export class AddNewUser {
  error = '';
  datarecieved = signal(false);
  private service = inject(Employee);

  employeelist: any = {
    contact: '',
    dob: '',
    email: '',
    firstname: '',
    lastname: ''
  };
  destroyref = inject(DestroyRef)

  createarecord(formValue: any) {
     let emp = {...this.employeelist,date:new Date().toISOString()};
   let subscription = this.service.senddata(emp).subscribe({
      next: () => {
        this.datarecieved.set(true);
        formValue.reset();
        
        setTimeout(() => this.datarecieved.set(false), 3000);
      },
      error: (err) => {
        this.error = err.message || 'Something went wrong';
        setTimeout(() => (this.error = ''), 3000);
      }
    } );
     this.destroyref.onDestroy(()=>{
          subscription.unsubscribe();
        })
  }
}
