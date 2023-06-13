import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements  OnInit,OnDestroy{
  constructor(private router:Router) {
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  exit() {
    localStorage.clear()
    this.router.navigate([''])
  }
}
