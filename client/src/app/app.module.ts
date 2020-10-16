import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MealsComponent } from './meals/meals.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from './auth.service';
@NgModule({
	declarations: [ AppComponent, LoginComponent, RegisterComponent, MealsComponent ],
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatAutocompleteModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		MatSnackBarModule,
		MatRadioModule,
		FlexLayoutModule,
		MatChipsModule,
		MatSelectModule
	],
	providers: [{

		provide: HTTP_INTERCEPTORS,
		useClass: AuthService,
		multi: true
	  }],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
