import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faInstagram as farInstagram } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight as fasRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft as fasLeft } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  constructor( private iconLibrary:FaIconLibrary){
    this.iconLibrary.addIcons(farInstagram, fasRight, fasLeft);
  }
  
  ngOnInit(): void {

  }
  
}
