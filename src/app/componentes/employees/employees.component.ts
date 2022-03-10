import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {

  employees: Observable<Employee[]> = {} as Observable<Employee[]>;
  employeeForm: FormGroup;
  displayEditForm: boolean = false;
  stateOptionsGenre: any[];
  stateOptionsJob: any[];
  responsiveOptions: any;
  image: any;

  uplo: File = {} as File;

  constructor(
    private employeeService: EmployeeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private photoService : PhotoService
  ) {
    this.employeeForm = new FormGroup({
      employeeId : new FormControl(),
      nombre: new FormControl(),
      puesto: new FormControl(),
      salario: new FormControl(),
      email: new FormControl(),
      telefono: new FormControl(),
      imagen: new FormControl(),
      genero: new FormControl(),
    });

    this.stateOptionsGenre = [
      { label: 'Male', value: 'male' },
      { label: 'Famale', value: 'famale' },
    ];

    this.stateOptionsJob = [
      { label: 'Waiter', value: 'waiter' },
      { label: 'Chef', value: 'chef' },
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
  }

  onSubmit() {
    if (
      this.employeeForm.value.nombre !== null &&
      this.employeeForm.value.puesto !== null &&
      this.employeeForm.value.salario !== null &&
      this.employeeForm.value.email !== null &&
      this.employeeForm.value.telefono !== null &&
      this.employeeForm.value.genero !== null
    ) {
      this.employeeService.addEmployee(this.employeeForm.value);
      this.messageService.add({
        severity: 'success',
        summary: `Saving employee!`,
        detail: 'Thanks!',
      });
      
    }else{
      this.messageService.add({
        severity: 'error',
        summary: `You must field the fileds`,
        detail: 'Try again!',
      });
    }
    this.employeeForm.reset();
  }

  /* Employee's Photo */

  async newImageUpload() {
    const path = 'UsersEmployees';
    this.image = await this.photoService.addPicture();
    const res = await this.photoService.uploadFile(this.image, path);
    this.employeeForm.value.imagen = res;
  }

  /* Edit employee */

  editEmployee(employee: Employee) {
    this.displayEditForm = true;
    this.employeeService.getEmployee(employee.employeeId).subscribe((data) => { 
      this.employeeForm.patchValue(data);
    });
  }

  /* Cancel toast */
  editCancel() {
    this.employeeForm.reset();
    this.messageService.add({
      severity: 'info',
      summary: 'Editing cancel..',
      detail: 'Have a nice day..',
    });
    this.displayEditForm = false;
  }

  /* Update edit employee */

  updateEmployee() {
    this.employeeService.updateEmployee(this.employeeForm.value);
    this.displayEditForm = false;
    setTimeout(() => {
      this.employeeForm.reset();
    }, 1000);
    this.messageService.add({
      severity: 'info',
      summary: 'Editing employee..',
      detail: 'Have a nice day..',
    });
  }

  /* Confirm delete employee */

  confirmDeleteInvoice(employee: Employee) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this employee?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Delete employee!! Good bye!!',
        });
        this.employeeService.deleteEmployee(employee.employeeId);
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Cancel',
              detail: 'Cancel changes..',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Maybe later..',
              detail: 'Have a nice day!!',
            });
            break;
        }
      },
    });
  }

  
}
