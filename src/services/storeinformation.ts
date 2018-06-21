import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})
export class StoreInformationService{
    private basicUrl = "http://34.214.14.69/gomallbackend/public/index.php/vendor"
    // private basicUrl = "http://nazikgcc.com/app/gomallbackend/public/index.php/vendor";
    constructor (public network : NetworkService) {}

    getBaseUrl(){
        return this.basicUrl;
    }

    onGetCountries(language) : Observable<any> {
        let url = this.basicUrl + "/countries?lang=" + language;
        console.log(url)
        return this.network.doGet(url)        
    }
    
    onGetCities(country, language) : Observable<any> {
        let url = this.basicUrl + "/cities/" + country + "?lang=" + language;
        console.log(url)
        return this.network.doGet(url)
    }

    onUpdateCities(country,data){
        let url = this.basicUrl + "/cities/" + country;
        console.log(url)
        return this.network.doPost(url,data)
    }
    onGetSelectedCountries(language) : Observable<any>{
        let url = this.basicUrl + "/selected_countries?lang=" + language;
        console.log(url)
        return this.network.doGet(url)        
    }
    onGetVendor(){
        let url = this.basicUrl
        return this.network.doGet(url)
    }

    onUpdateVendor(data){
        let url = this.basicUrl
        return this.network.doPost(url,data)
    }

    uploadPicture(data) : Observable<any> {
        let url = this.basicUrl + "/image/upload";
        return this.network.doPostPictures(url,data)
    }


}