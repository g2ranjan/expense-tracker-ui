import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense';
import { ExpensesService } from '../../services/expenses.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent implements OnInit{

  expense:Expense= new Expense();

  constructor(private expenseService:ExpensesService, private router:Router,private activatedRoute:ActivatedRoute){}

  ngOnInit():void{
    if(this.activatedRoute.snapshot.paramMap.has('id')){
      const id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.expenseService.getExpenseById(id).subscribe(
        data => {this.expense=data}
      );
    }
  }

  saveExpense(){
    this.expenseService.saveExpense(this.expense).subscribe(data => {
      this.router.navigateByUrl("/expenses")
    })
  }

  onDeleteExpense(id:number){
    this.expenseService.deleteExpense(id).subscribe((data => {
      this.router.navigateByUrl("/expenses")
    }))
  }
}
