import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeesService } from '../../services/employees.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-employees-management',
  templateUrl: './employees-management.component.html',
  styleUrls: ['./employees-management.component.css']
})
export class EmployeesManagementComponent implements OnInit {
  employeeList: Employee[] = [];
  employeeListToAdd: Employee[] = [];
  editField: string;
  isFilled: boolean = true;
  isSaved: boolean = false;

  constructor(private employeeService: EmployeesService ) { }


/*
 * on init
*/

  ngOnInit(): void {
    this.getListEmployee();
 
  }

/*
* Get all employees 
*/
  getListEmployee() {
    return this.employeeService.getListJobAdFiltred().subscribe(data => {
      if (data) { this.employeeList = data; }
      else {
        this.employeeList = [];
      }
      
    });
  }

/*
* Update List
*/
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    if (editField != null || editField != '' || property != 'id') {
      this.employeeList[id][property] = editField;
      this.employeeListToAdd.push(this.employeeList[id]);
    }
    else { this.isFilled = false;}
    
  }

/*
* delete employee
*/
  remove(id: number) {
    this.employeeList.splice(id,1); 
  }
/*
* add  employee
*/
  add() {
    var employee = new Employee(0,'', '', 0, 0);
    employee.id = this.employeeList.length + 1;
    this.employeeList.push(employee);
    this.employeeListToAdd.push(employee);

  }
/*
* changed value in table
*/
  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
    if (this.editField == null || this.editField == '') {
         this.isFilled = false; }

  }
/*
* save or update list of employee
*/
  saveEmployees() {
    this.checkValues();
    console.log(this.employeeListToAdd);
    if (this.isFilled) {
      console.log(this.employeeListToAdd);
      this.employeeService.saveEmployees(this.employeeListToAdd).subscribe(data => {
        console.log(data)
        this.employeeList = data;
        this.employeeListToAdd = [];
      });
      this.isSaved = true; 
    }
  }
/*
* check values created or changed
*/
  checkValues() { 
    for (let employee of this.employeeListToAdd) {
      if (employee.id == 0 || employee.age < 16 || employee.salary == 0 || employee.fname == '' || employee.lastName == '') {
        this.isFilled = false;
      }
      
    }
  }
/*
* close Alert
*/
  close() {
    this.isSaved = false;
    this.isFilled = true;
  }

 
}
