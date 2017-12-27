import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})

export class SettingsService{
    private basicUrl = "http://34.214.14.69/gomallbackend/public/index.php/vendor";
    constructor (public network : NetworkService) {}

    onGetTermsAndConditions() : Observable<any> {
        let url = this.basicUrl + "/terms";
        return this.network.doGet(url)
    }
    onchangePassword(data) : Observable<any> {
        let url = this.basicUrl + "/password";
        return this.network.doPost(url,data)
    }

}