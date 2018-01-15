import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})

export class StockService{
    private basicUrl = "http://34.214.14.69/gomallbackend/public/index.php/vendor";
    constructor (public network : NetworkService) {}

    onUpdateStock(data) : Observable<any> {
        let url = this.basicUrl + "/stock";
        console.log(url)
        return this.network.doPost(url, data)
    }


}