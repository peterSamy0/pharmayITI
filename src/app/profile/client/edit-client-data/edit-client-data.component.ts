import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import clientsData from '../../../../assets/json/users.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertIcon } from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-edit-client-data',
  templateUrl: './edit-client-data.component.html',
  styleUrls: ['./edit-client-data.component.css'],
})
export class EditClientDataComponent {
  updateClientForm: FormGroup;
  clients: Array<any> = clientsData;
  emailFail: boolean = false;
  passFail: boolean = false;
  userFullNameFail: boolean = false;
  notAllDataEntered: boolean = false;
  Swal!: SweetAlertIcon;
  isCity: boolean = false;
  governorateID!: number;
  cities: any;
  governorates: any;
  cityID!: number;
  id!: number;
  clientId!:any;
  clientName !:any;
  clientEmail !:any;
  clientGovern!: any;
  clientCity!: any;
  clientPhone!:any;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private http: HttpClient
  ) {
    this.updateClientForm = new FormGroup({
      clientFullName: new FormControl('', [Validators.required]),
      // clientUserName: new FormControl('', [Validators.required]),
      clientPhone: new FormControl('', [Validators.required]),
      clientEmail: new FormControl('', [Validators.required]),
      clientCity: new FormControl('', [Validators.required]),
      clientGovern: new FormControl('', [Validators.required]),
      // clientPass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    console.log(this.activeRoute.snapshot.params['id']);
    this.getGovernorates();
    this.id = this.activeRoute.snapshot.params['id'];
    this.profileService.getClient(this.id).subscribe((res: any) => {
      this.clientId = res.data;
      console.log(this.clientId);
     this.clientName = this.clientId.client_name;
     this.clientEmail = this.clientId.client_email;
     this.clientGovern = this.clientId.Governorate;
     this.clientCity = this.clientId.city;


    });
  }

  // clientId: any = clientsData[this.activeRoute.snapshot.params['id'] - 1];

  update() {
    console.log(this.updateClientForm.value);
    let clientFullName = this.updateClientForm.controls['clientFullName'].value;
    let clientEmail = this.updateClientForm.controls['clientEmail'].value;
    // let clientUserName = this.updateClientForm.controls['clientUserName'].value;
    let clientPhone = this.updateClientForm.controls['clientPhone'].value;
    let clientCity = this.updateClientForm.controls['clientCity'].value;
    let clientGovern = this.updateClientForm.controls['clientGovern'].value;
    // let clientPass = this.updateClientForm.controls['clientPass'].value;

    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let fullNamePattern =
      /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


    

    if (!clientEmail.match(emailPattern)) {
      console.log('invalid email format');
      this.emailFail = true;
    } 
    // else if (!clientPass.match(passPattern)) {
    //   console.log('wrong password format');
    //   this.passFail = true;
    // } 
    else if (!clientFullName.match(fullNamePattern)) {
      console.log('wrong full name format');
      this.userFullNameFail = true;
    } else if (
      clientEmail &&
      // clientUserName &&
      clientFullName &&
      clientGovern &&
      clientCity &&
      clientPhone
      //  &&clientPass
    ) {
      let updatedData = {
        id: this.activeRoute.snapshot.params['id'],
        // userName: clientUserName,
        // userPass: clientPass,
        fullName: clientFullName,
        gender: this.clientId.gender,
        email: clientEmail,
        phone: clientPhone,
        city: clientCity,
        governorate: clientGovern,
      };
      localStorage.setItem('updatedData', JSON.stringify(updatedData));
      this.passFail = false;
      this.emailFail = false;
      this.userFullNameFail = false;
      this.clientId = { ...this.clientId, ...updatedData };
      console.log(this.clientId, this.clients);
    } else {
      this.notAllDataEntered = true;
    }
  }

  getGovernorates() {
    this.http.get(`http://localhost:8000/api/governorates`).subscribe(
      (response) => {
        this.governorates = response;
        console.log(this.governorates);
      },
      (error) => console.log(error)
    );
  }
  selectedCity(val: any) {
    this.cityID = val;
  }
  selectedGov(val: any) {
    this.isCity = true;
    this.governorateID = val;
    this.http.get(`http://localhost:8000/api/governorates/${val}`).subscribe(
      (response) => {
        this.cities = response;
      },
      (error) => console.log(error)
    );
  }

  
}
