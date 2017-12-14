import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})
export class StoreInformationService{
    private basicUrl = "http://34.214.14.69/gomallbackend/public/index.php/vendor"
    constructor (public network : NetworkService) {}
 
    onGetCities(country) : Observable<any> {
        let url = this.basicUrl + "/cities/" + country;
        return this.network.doGet(url)
    }

    onUpdateCities(country,data){
        let url = this.basicUrl + "/cities/" + country;
        return this.network.doPost(url,data)
    }

    onUpdateVendor(data){
        let url = this.basicUrl
        return this.network.doPost(url,data)
    }


}