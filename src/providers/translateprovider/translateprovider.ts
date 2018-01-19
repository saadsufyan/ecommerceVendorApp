
import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import 'rxjs/add/operator/map';


@Injectable()
export class TranslateproviderProvider {

  public dir : any
  public lang

  constructor(public translate: TranslateService) {
    console.log('Hello TranslateproviderProvider Provider');
  }
  checkLocale(){
    this.lang = localStorage.getItem('lang')
    if(this.lang == 'ar'){
      this.dir = 'rtl'
    }
    else{
      this.dir = 'ltr'
    }
  }

  public getTranslation(keyword){
    return this.translate.get(keyword)
  }  
}
