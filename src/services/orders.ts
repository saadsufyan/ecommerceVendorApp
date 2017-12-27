import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})

export class OrderService{
    private basicUrl = "http://34.214.14.69/gomallbackend/public/index.php/vendor";
    constructor (public network : NetworkService) {}

    onGetVendorOrders(){
        let url = this.basicUrl + "/orders";
        return this.network.doGet(url)
    }
    onGetVendorsFilter(orderStatus, startDate, endDate){
        let url = this.basicUrl + "/orders??status=" + orderStatus + "from=" + startDate + "&to=" + endDate + "&page=1&limit=1000"
        return this.network.doGet(url)
    }
    onGetOrderDetails(id){
        let url = this.basicUrl + "/orders/" + id;
        return this.network.doGet(url)
    }
    onGetOrderItems(id,item_id){
        let url = this.basicUrl + "/orders/" + id + "/order_items/" + item_id;
        return this.network.doGet(url)

    }
    OnVendorOrderStatus(id, data){
        let url = this.basicUrl + "/orders/" + id;
        return this.network.doPost(url, data)
    }

}