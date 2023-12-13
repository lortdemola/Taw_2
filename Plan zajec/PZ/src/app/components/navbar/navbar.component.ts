import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  gotSize!:any;
  constructor(public authService: AuthService,private dataService: DataService, public router: Router) {
  }

  ngOnInit(): void {
    this.loadSchedule();
  }
  loadSchedule() {
    this.dataService.getScheduleAmountByUserId(this.authService.currentUser.userId).subscribe(data => {
      this.gotSize = data;
    });
  }
  signOut() {
    this.authService.logout().subscribe((result: any) => {
      this.router.navigate(['/']);

      return result;
    });
  }

}
