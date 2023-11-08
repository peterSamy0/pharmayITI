
import { NgModule } from '@angular/core';
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
import { ViewOrdersComponent } from './pharmacist-home/components/view-orders/view-orders.component';
import { ViewOneOrderComponent } from './pharmacist-home/components/view-one-order/view-one-order.component';
import { ListProductsComponent } from './pharmacist-home/components/list-products/list-products.component';
import { EditProductsComponent } from './pharmacist-home/components/edit-products/edit-products.component';
import { AddProductsComponent } from './pharmacist-home/components/add-products/add-products.component';
import { SelectDeliveryComponent } from './pharmacist-home/components/select-delivery/select-delivery.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './cart/orders/orders.component';
import { SignupAsDeliveryComponent } from './auth/signup-as-delivery/signup-as-delivery.component';
import { SigninAsDeliveryComponent } from './auth/signin-as-delivery/signin-as-delivery.component';
import { PaymentComponent } from './payment/components/payment/payment.component';
import { ViewClientDataComponent } from './profile/client/view-client-data/view-client-data.component';
import { ViewPharmacyDataComponent } from './profile/pharmacy/view-pharmacy-data/view-pharmacy-data.component';
import { ViewDeliveryDataComponent } from './profile/delivery/view-delivery-data/view-delivery-data.component';
import { EditClientDataComponent } from './profile/client/edit-client-data/edit-client-data.component';
import { EditPharmacyDataComponent } from './profile/pharmacy/edit-pharmacy-data/edit-pharmacy-data.component';
import { EditDeliveryDataComponent } from './profile/delivery/edit-delivery-data/edit-delivery-data.component';
import { AuthGuard } from './guard/auth.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';

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
    path:'profile',
    component:ProfileComponent
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
    path :'listproduct',
    component : ListProductsComponent,
    canActivate: [AuthGuard]

  },
  {
    path: "pharmacyDetails",
    component: CarouselComponent
  },
  {
    path: "viewOrders",
    component: ViewOrdersComponent
  },
  {
    path: "viewOrders/selectDelivery/:region",
    component: SelectDeliveryComponent
  },
  {
    path: "viewOrders/:id",
    component: ViewOneOrderComponent
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
  {
    path: "addProduct",
    component: AddProductsComponent,
    canActivate: [AuthGuard]
  },  
  {
    path: "editProduct/:id",
    component: EditProductsComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: "orders",
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "signup-delivery",
    component: SignupAsDeliveryComponent
  },
  {
    path: "signin-delivery",
    component: SigninAsDeliveryComponent
  },
  {
    path :'payment',
    component : PaymentComponent
  },
  {

    path : "client-profile/:id",
    component: ViewClientDataComponent,
    canActivate: [AuthGuard]

  },
  {
    path : "pharmacy-profile/:id",
    component: ViewPharmacyDataComponent,
    canActivate: [AuthGuard]

  },
  {
    path : "delivery-profile/:id",
    component: ViewDeliveryDataComponent,
    canActivate: [AuthGuard]

  },
  {
    path : "edit-personal-data/:id",
    component: EditClientDataComponent,
    canActivate: [AuthGuard]

  },
  {
    path : "edit-pharmacy-data/:id",
    component: EditPharmacyDataComponent,
    canActivate: [AuthGuard]
  },
  {
    path : "edit-delivery-data/:id",
    component: EditDeliveryDataComponent,
    canActivate: [AuthGuard]
  },
  {
    path : "contact-us",
    component: ContactUsComponent
  },
  {
    path : "about-us",
    component: AboutUsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
