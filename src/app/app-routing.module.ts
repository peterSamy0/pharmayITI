
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninAsClientComponent } from './auth/signin-as-client/signin-as-client.component';
import { SigninAsPharmacyComponent } from './auth/signin-as-pharmacy/signin-as-pharmacy.component';
import { SignupAsClientComponent } from './auth/signup-as-client/signup-as-client.component';
import { SignupAsPharmacyComponent } from './auth/signup-as-pharmacy/signup-as-pharmacy.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CarouselComponent } from './pharmacy/components/carousel/carousel.component';
import { PharmacyDetailsComponent } from './pharmacy/components/pharmacy-details/pharmacy-details.component';

import { CategoryComponent } from './pharmacy/components/category/category.component';


import { CartpageComponent } from './cart/cartpage/cartpage.component';
import { SearchComponent } from './pharmacy/components/search/search.component';
import { AddProductsComponent } from './pharmacist-home/components/add-products/add-products.component';

const routes: Routes = [

  {
    path:'',
    component: HomepageComponent
  },
  {
    path:'home',
    component: HomepageComponent
  },
  {
    path:'signIn',
    component: SigninComponent
  },
  {
    path: 'signUp',
    component: SignupComponent
  },
  {
    path:'signin-client',
    component:SigninAsClientComponent
  },
  {
    path:'signin-pharmacy',
    component:SigninAsPharmacyComponent
  },
  {
    path:'signup-client',
    component: SignupAsClientComponent
  },
  {
    path:'signup-pharmacy',
    component:SignupAsPharmacyComponent
  },
  {
    path :'cart',
    component : CartpageComponent
  },
  {
    path: "pharmacyDetails",
    component: CarouselComponent
  },
  {
    path :'pharmacy/:id',
    component : PharmacyDetailsComponent,
    children : [
      {
        path : 'category/:category',
        component: CategoryComponent
      }
    ]
  },
  // {
  //   path: 'search/:query',
  //   component: PharmacyDetailsComponent
  // },
  {
    path: "addProduct",
    component: AddProductsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
