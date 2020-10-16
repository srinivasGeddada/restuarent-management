import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	constructor(
		private readonly dataService: DataService,
		private readonly router: Router,
		private _snackBar: MatSnackBar,
		
	) {}
	
	ngOnInit(): void {
		
	}
	

	LoginForm: FormGroup = new FormGroup({
		email: new FormControl('', [ Validators.required, Validators.email ]),
		password: new FormControl('', [ Validators.required ])
	});

	async submit() {
		//	this.initializeForm();
		console.log(this.LoginForm.value);
		this.dataService.login(this.LoginForm.value).subscribe(async (res) => {
			if (res.success === true) {
				console.log(res);
				await localStorage.setItem('token', res.data.token);
				this.router.navigate([ 'meals' ]);
			} else {
				this._snackBar.open(res.message, 'Dismiss', {
					duration: 2000
				});
			}
		});
	}
}
