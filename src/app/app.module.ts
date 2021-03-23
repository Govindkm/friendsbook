import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// material modules
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { PostsComponent } from './components/home/posts/posts.component';
import { NetworkComponent } from './components/network/network.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FriendsComponent } from './components/friends/friends.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FakeBackendService } from './interceptor/fake-backend.interceptor';
import { JwtInterceptorService } from './interceptor/jwt-interceptor.service';
import { LogoutComponent } from './components/logout/logout.component';

const material = [
  MatCardModule,
  MatSliderModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ProfileComponent,
    PostsComponent,
    NetworkComponent,
    SettingsComponent,
    FriendsComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,


    ...material
  ],
  providers: [
    
    {provide : HTTP_INTERCEPTORS , useClass : JwtInterceptorService, multi : true},
    {provide : HTTP_INTERCEPTORS , useClass : FakeBackendService, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
