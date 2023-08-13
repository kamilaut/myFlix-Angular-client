import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;
  editMode = false;
  editedUser: any = {};

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userName = localStorage.getItem('user');  
    if (userName) {
      this.fetchApiData.getOneuser(userName).subscribe((response: any) => {  
        this.user = response;
        this.editedUser = { ...this.user };
        console.log('User Profile:', this.user);  
      });
    }
  }
  
  saveChanges(): void {
    const loggedInUserName = localStorage.getItem('username');  
    if (loggedInUserName) {
      this.fetchApiData.editUser(loggedInUserName, this.editedUser).subscribe((response: any) => {
        this.user = response;
        this.editMode = false;
        this.router.navigate(['/profile']);
      });
    } else {
      console.error('Logged-in user username not found in localStorage');
    }
  }
}