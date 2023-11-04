import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Users } from 'src/app/interface/users';
import userData from '../../../assets/json/users.json'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';

// CommonJS
@Component({
  selector: 'app-signin-as-client',
  templateUrl: './signin-as-client.component.html',
  styleUrls: ['./signin-as-client.component.css'],
})
export class SigninAsClientComponent {

  pharmacyId!: any;
  users : Users[]= userData;
  private tokenKey = 'access_token'; // Key used for storing the token in localStorage

  Swal !:SweetAlertIcon;

  signinForm: FormGroup;
  constructor(private http: HttpClient, private router: Router) {
    this.signinForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required]),
      userPass: new FormControl('',[Validators.required])
    });

    }

    checkUser(){
      let userEmail =this.signinForm.controls['userEmail'].value;
      let userPass =this.signinForm.controls['userPass'].value;
      const body = {
        "email": userEmail,
        "password":   userPass     
      } 
      const token = localStorage.getItem('access_token');
      this.http.post(`http://localhost:8000/api/auth/login`, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .subscribe(
          (response:any) => {
            this.tokenKey = response['token']
            this.pharmacyId = response['user_id'];
            localStorage.setItem('token', this.tokenKey);
            localStorage.setItem('user_id', this.pharmacyId);
            this.router.navigate(['/profile']);
          },
  
          error => {
            console.log(error)
            Swal.fire({
              title: 'Error!',
              text: 'invaled email or password',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          }
        );
    }
    // Save the token to localStorage


    // Get the token from localStorage
    getToken(): string | null {
      return localStorage.getItem(this.tokenKey);
    }

    // Remove the token from localStorage
    removeToken(): void {
      localStorage.removeItem(this.tokenKey);
}
   
  }

 



