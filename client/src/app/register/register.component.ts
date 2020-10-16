import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
	constructor(
		private readonly dataService: DataService,
		private readonly router: Router,
		private _snackBar: MatSnackBar
	) {}
	roles = [ { role: 'customer', checked: true }, { role: 'manager', checked: false } ];
	ngOnInit(): void {}

	RegisterForm: FormGroup = new FormGroup({
		email: new FormControl('', [ Validators.required, Validators.email ]),
		password: new FormControl('', [ Validators.required ]),
		user_name: new FormControl('', Validators.required),
		role: new FormControl('')
	});

	registerUser() {
		console.log(this.RegisterForm.value);
		this.dataService.regsiterUser(this.RegisterForm.value).subscribe((res) => {
			console.log(res);
			if (res.success) {
				localStorage.setItem('token', res.data.token);
				this.router.navigate([ 'meals' ]);
			} else {
				this._snackBar.open(res.message, 'Dismiss', {
					duration: 2000
				});
			}
		});
	}
}
