import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { Employee } from '../employee';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { DobagePipe } from "../dobage-pipe";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '../dialog/dialog';
@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  constructor(
    private destroyref: DestroyRef,
    private service: Employee,
    private dialog: MatDialog,
    private router: Router,
  ) {}
  values = '';
  confirm = signal(false);

  error = signal('');
  isfetching = signal(false);
  list: any[] = [];
  // filtervalue=signal<any[]>([]);
  getmethod() {
    this.isfetching.set(true);
    let subscription = this.service.userlist().subscribe({
      next: (val) => {
        this.list = val;
        console.log(this.list);
      },
      error: (err) => {
        this.error.set(err.message);
      },
      complete: () => {
        this.isfetching.set(false);
      },
    });
    this.destroyref.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  ngOnInit() {
    this.getmethod();
  }
  onfilterchange() {
    if (this.values === 'age') {
      this.list.sort(
        (a, b) =>
          new Date().getFullYear() -
          new Date(b.dob).getFullYear() -
          (new Date().getFullYear() - new Date(a.dob).getFullYear()),
      );
    } else if (this.values === 'date') {
      this.list.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    } else {
      this.list.sort((a, b) => a.id - b.id);
    }
  }
  deleteuser(id: string) {
    let dialogRef = this.dialog.open(Dialog, {
      data: { ids: id },
      width: '800px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let subscription = this.service.deletedata(id).subscribe({
          next: () => {
            this.confirm.set(true);
            setTimeout(() => this.confirm.set(false), 3000);
          },
          complete: () => this.getmethod(),
        });
        this.destroyref.onDestroy(() => {
          subscription.unsubscribe();
        });
      }
    });
  }

  updateUser(id: string) {
    let dialogRef = this.dialog.open(Dialog, {
      data: { ids: id, str: 'edit' },
      width: '800px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let stored = this.list.filter((e) => e.id === id);
        this.router.navigate(['/updateinfo'], { state: stored });
      }
    });
  }
}
