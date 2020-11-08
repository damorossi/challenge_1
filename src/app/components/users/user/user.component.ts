import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientApiService } from 'src/app/services/client-api.service';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  showMessage = false;
  successMessage: boolean;
  constructor(
      private apiService: ClientApiService,
      private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== 'add') {
      this.apiService.getSingleInstance('users', id)
          .subscribe((resp: any) => {
            this.user = {...resp.data};
            this.user.name = resp.data.first_name + ' ' + resp.data.last_name;
            this.user.id = resp.data.id;
          });
    } else {
      this.user = new User();
    }
  }

  saveData(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    let request: Observable<any>;
    if(this.user.id) {
      request = this.apiService.updateInstance('users', this.user);
    }else {
      request = this.apiService.createInstance('users', this.user)
    }

    request.subscribe(resp => {
      this.showMessage = true;
      this.successMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.successMessage = false;
      }, 2000);
    });
  }
}
