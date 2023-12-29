import { Component, inject } from '@angular/core';
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { catchError, of } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {

  http=inject(HttpClient);
  rout=inject(Router);
  message:string='';
  busy:boolean=false;
  hide = true;
  matcher = new MyErrorStateMatcher();

  mobileFormControl = new FormControl('', [Validators.required, Validators.pattern('^09[0-9]{9}$')]);
  passwordFormControl=new FormControl('', [Validators.required]);

  clean(){
    this.message='';
  }

  checkKeyNumber(k:KeyboardEvent){
    if(!(k.key>='0' && k.key<='9')){
      k.preventDefault();
    }
  }

  signup(){
    this.rout.navigate(['/admin-register']);
  }

  check(){
    this.message='';
    this.busy=true;
    this.http.post('https://localhost:7094/adminLogin',
    {username:this.mobileFormControl.value, password:this.passwordFormControl.value})
    .pipe(catchError((err:HttpErrorResponse)=>{
      if (!err.ok && err.status==500) {
        return of({
          isOk:false,
          message:err.error.errorMessage
        })
      }
      return of({
        isOk:false,
        message:'ارتباط با سرویس دهنده برقرار نیست'
      })
    }))
    .subscribe(result=>{
      if((result as any).isOk){
        sessionStorage.setItem('token',(result as any).token);
      }
      this.message=(result as any).message;
      this.busy=false;
    })
  }
}
