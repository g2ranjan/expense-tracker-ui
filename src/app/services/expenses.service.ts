import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , map } from 'rxjs';
import { Expense } from '../models/expense';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private getUrl :string = "http://localhost:8081/api/v1/expenses"

  constructor(private _httpClient :HttpClient ) { }

  getExpenses() : Observable<Expense[]> {
    return this._httpClient.get<Expense[]>(this.getUrl);
  }

  saveExpense(expense:Expense):Observable<Expense>{
    return this._httpClient.post<Expense>(this.getUrl,expense);
  }

  getExpenseById(id:number):Observable<Expense>{
    return this._httpClient.get<Expense>(`${this.getUrl}/${id}`).pipe(
      map(response=>response));
    }
  deleteExpense(id:number){
    return this._httpClient.delete(`${this.getUrl}/${id}`,{responseType:'text'})
  }
}
