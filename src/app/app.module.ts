import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/users/user/user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataHandlerComponent } from './components/shared/data-handler/data-handler.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { CommonTableComponent } from './shared/common-table/common-table.component';
import { MainTableComponent } from './components/shared/main-table/main-table.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    UserComponent,
    DataHandlerComponent,
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent,
    CommonTableComponent,
    MainTableComponent,
    UsersListComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
