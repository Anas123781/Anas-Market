import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLink as fasLink } from '@fortawesome/free-solid-svg-icons';
import { faFacebook as fasFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter as fasTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGooglePlus as fasGoogle } from '@fortawesome/free-brands-svg-icons';
import { faYoutube as fasYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private iconLibrary:FaIconLibrary) {
    this.iconLibrary.addIcons(fasLink, fasFacebook, fasTwitter, fasGoogle, fasYoutube );

  }  ngOnInit(): void {
  }
  

}
