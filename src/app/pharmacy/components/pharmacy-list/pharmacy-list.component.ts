import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Governorate } from 'src/app/interface/governorate';
import { BehaviorSubject,} from 'rxjs';
import { City } from 'src/app/interface/city';

import { Pipe, PipeTransform } from '@angular/core';
import { DropDownService } from 'src/app/shared/services/drop-down.service';
import { faAngleRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pharmacy-list',
  templateUrl: './pharmacy-list.component.html',
  styleUrls: ['./pharmacy-list.component.css']
})
export class PharmacyListComponent{
  pharmArr!:any;
  idArr!: any;
  faSearch = faSearch;
  searchText='';
  faAngleRight = faAngleRight
  faLocation = faLocationDot
  faAngleDown =faAngleDown;
  faAngleLeft = faAngleLeft
  showList: boolean = false;
  showSubList: boolean = false;
  cities: any;
  GovernorateName: any;
  location: string = "Location";
  data: any= "not yet";
  page :number=1;
  totalLength:any;

  constructor(private service:ServiceService, private httpClient: HttpClient,
    private dropService: DropDownService,
    private router:Router
   ){
 
  }
  
  ngOnInit() {
   this.getPharamciesData();
   this.getData();
  }
  
  getPharamciesData(){
    this.service.getPharmacies().subscribe((res :any)=>{
      this.pharmArr = res.data;
      this.totalLength=this.pharmArr;
      this.pharmArr.forEach((e:any,i:any) => {
        e.id=i+1;
      });
    })
  }
  
  getData() {
    this.service.getGovernorates().subscribe(
      (res) => {
        this.data = res;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  // function to open or close the list of governorates 
  openList() {
    this.showList = !this.showList;
    if (this.showSubList === true) {this.showSubList = false}
  }

  // function to open the list of cities in governorates
  openSubList(val: any) {
    this.dropService.openSubList(val)
    this.cities = val.cities;
    this.GovernorateName = val.governorate
    this.showList = !this.showList;
    this.showSubList = !this.showSubList
  }
  // function to close list of cities 
  closeSubList(){
    this.showSubList = !this.showSubList
    this.showList = !this.showList;
  }
  // fucntion to save the location of user and send it to service
  sendLocation(val: any){
    this.getPharamciesData()
    this.dropService.sendLocation(val)
    this.location = this.GovernorateName + ", " + val
    this.showSubList = false
    this.showList = false;
    this.pharmArr = this.pharmArr.filter( (city: any) => {
      if(city['Governorate'] == this.GovernorateName && city['city'] == val){
        return city; 
      }
    })
  }

  goToDetails(id:number){
    this.router.navigate(["/pharmacy",id]);
  }

  }
