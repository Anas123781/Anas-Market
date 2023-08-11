import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from 'src/app/shared-module/services/shared.service';

export const authGuard: CanActivateFn = (route, state) => {
  const header = route.url[0].path;
  const router = inject(Router)
  const sharedService = inject(SharedService);
  if(sharedService) {
    return true
  } else {
    if(header == 'home') {
      return true
    } else {
      alert('access denied');
      router.navigate(['home'])
      return false;
    }
  }
};
 