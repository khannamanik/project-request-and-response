import { Routes } from '@angular/router';
import { UserList } from './user-list/user-list';
import { AddNewUser } from './add-new-user/add-new-user';
import { App } from './app';
import { Body } from './body/body';
import { UpdateAUser } from './update-a-user/update-a-user';
import { Statistics } from './statistics/statistics';

export const routes: Routes = [
    {
        path:'',
        component:Body
    },
    {
        path:'userlist',
        component:UserList,
    },
   {
    path:'AddUser',
    component:AddNewUser
   },
   {
    path:'updateinfo',
    component:UpdateAUser
   },
   {
    path:'stats',
    component:Statistics
   }
];
