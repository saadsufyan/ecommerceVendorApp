import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})
export class LoginService{
    // private basicUrl = "http://34.214.14.69/gomallbackend/public/index.php/vendor"
    private basicUrl = "http://nazikgcc.com/app/gomallbackend/public/index.php/vendor"
    constructor (public network : NetworkService) {}
 
    onUserLogin(data) : Observable<any> {
        let url = this.basicUrl + "/login";
        return this.network.doPost(url,data)
    }

    onUserLogout() : Observable<any> {
        let url = this.basicUrl + "/logout";
        return this.network.doGet(url)
    }


}