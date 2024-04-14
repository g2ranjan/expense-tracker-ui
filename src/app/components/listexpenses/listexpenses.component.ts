import { Component , OnInit} from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../models/expense';
import { log } from 'console';

@Component({
  selector: 'app-listexpenses',
  templateUrl: './listexpenses.component.html',
  styleUrl: './listexpenses.component.css'
})
export class ListexpensesComponent implements OnInit {

  expenses : Expense[] = [];

  constructor(private _expenseService : ExpensesService) {}

  filter={
    Keyword:'',
    sortBy:''
  }

  loadApp(){
    this._expenseService.getExpenses().subscribe(
      data=>{
        this.expenses=this.filterSearch(data)
      }
    )
  }

  ngOnInit() : void {
    this.loadApp();
  }

  onDeleteExpense(id:number){
    this._expenseService.deleteExpense(id).subscribe((
      (data)=> {
        console.log("deleted Sucessfully" , data);
        this.loadApp()
      })
    )
  }

  onSelect(){
    console.log(this.filter.sortBy);
  }

  filterSearch(expense:Expense[]):Expense[]{
    return expense.filter((expenseOb) => {
      return expenseOb.expense.toLowerCase().includes(this.filter.Keyword.toLowerCase())
    }).sort((expenseObj1,expenseObj2) =>{
      if(this.filter.sortBy==="Name")
        return expenseObj1.expense.toLowerCase() < expenseObj2.expense.toLowerCase() ? -1 : 1;
      else if(this.filter.sortBy==="Amount")
        return expenseObj1.amount > expenseObj2.amount ? -1 : 1;
      else
        return -1;
    })
  }
}
