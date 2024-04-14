import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListexpensesComponent } from './components/listexpenses/listexpenses.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';

const routes: Routes = [
  {path:'expenses',component:ListexpensesComponent},
  {path:'addexpenses',component:AddExpenseComponent},
  {path:'expenses/editexpense/:id',component:AddExpenseComponent},
  {path:'',redirectTo:'/expenses' , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
