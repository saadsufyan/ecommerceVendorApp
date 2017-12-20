import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})

export class ProductsService{
    private basicUrl = "http://34.214.14.69/gomallbackend/public/index.php/vendor";
    constructor (public network : NetworkService) {}

    onGetTopProducts() : Observable<any> {
        let url = this.basicUrl + "/top_products";
        return this.network.doGet(url)
    }

}