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
  // clients: Array<any> = clientsData;
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
  clientId!: any;
  clientName!: any;
  clientEmail!: any;
  oldGov!: any;
  oldCity!: any;
  oldGovId!: number;
  oldCityId!: number;
  clientPhone!: any;
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
      clientPass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    console.log(this.activeRoute.snapshot.params['id']);

    this.id = this.activeRoute.snapshot.params['id'];
    this.getUserData();
    this.getGovernorates();

    // this.getCurrentGoverId();
  }

  // clientId: any = clientsData[this.activeRoute.snapshot.params['id'] - 1];
  getUserData() {
    this.profileService.getClient(this.id).subscribe(
      (res: any) => {
        this.clientId = res.data;
        console.log(this.clientId);
        this.clientName = this.clientId.client_name;
        this.clientEmail = this.clientId.client_email;
        this.oldGov = res.data.Governorate;
        this.oldCity = res.data.city;
      },
      (error) => console.log(error)
    );
  }
  update() {
    console.log(this.updateClientForm.value);
    let clientFullName = this.updateClientForm.controls['clientFullName'].value;
    let clientEmail = this.updateClientForm.controls['clientEmail'].value;
    // let clientUserName = this.updateClientForm.controls['clientUserName'].value;
    let clientPhone = this.updateClientForm.controls['clientPhone'].value;
    // let clientCity = this.updateClientForm.controls['clientCity'].value;
    // let clientGovern = this.updateClientForm.controls['clientGovern'].value;
    let clientPass = this.updateClientForm.controls['clientPass'].value;

    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let fullNamePattern =
      /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const body = {
      user: {
        name: clientFullName,
        email: clientEmail,
        password: clientPass || this.clientId.password || 324234,
      },
      client: {
        governorate_id: +this.governorateID || this.oldGovId,
        city_id: this.cityID || this.oldCityId,
      },
    };

    if (!clientEmail.match(emailPattern)) {
      console.log('invalid email format');
      this.emailFail = true;
      this.profileService.errorAlert();
    }
    //  else if (!clientPass.match(passPattern)) {
    //   console.log('wrong password format');
    //   this.passFail = true;
    //   this.profileService.errorAlert()
    // }
    else if (
      clientEmail &&
      // clientPass&&
      // pharmaPhone&&
      clientFullName
    ) {
      this.profileService.updateClient(this.id, body).subscribe(
        (response: any) => {
          this.router.navigate([`/client-profile/${this.id}`]);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.notAllDataEntered = true;
      this.profileService.errorAlert();
    }
  }

  getGovernorates() {
    this.profileService.getGovernorates().subscribe(
      (response: any) => {
        this.governorates = response;
        console.log(this.governorates);
        this.oldGovId = this.governorates.find(
          (obj: any) => obj['governorate_name'] === this.oldGov
        ).governorate_id;
        this.oldCityId = this.governorates
          .find((obj: any) => obj['governorate_name'] === this.oldGov)
          .cities.find(
            (city: any) => city['city_name'] == this.oldCity
          ).city_id;
        console.log(this.oldCityId, this.oldGovId);
      },
      (error) => console.log(error)
    );
  }

  selectedGov(val: any) {
    this.isCity = true;
    this.governorateID = val;

    this.profileService.selectedGov(val).subscribe(
      (response: any) => {
        this.cities = response.data;
      },
      (error) => console.log(error)
    );
  }

  selectedCity(val: any) {
    this.cityID = val;
  }
}