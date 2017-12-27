import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})

export class PaymentService{
    private basicUrl = "http://34.214.14.69/gomallbackend/public/index.php/vendor";
    constructor (public network : NetworkService) {}

    onGetMyPayments(){
        let url = this.basicUrl + "/payments?page=1&limit=1000";
        return this.network.doGet(url)
    }

}