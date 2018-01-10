import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})
export class PromotionsService{
    private basicUrl = "http://34.214.14.69/gomallbackend/public/index.php/vendor"
    constructor (public network : NetworkService) {}
 
    onGetPromotions() : Observable<any> {
        let url = this.basicUrl + "/promotions?page=1&limit=1000";
        return this.network.doGet(url)
    }

    onGetPromotionById(id){
        let url = this.basicUrl + "/promotions/" + id;
        return this.network.doGet(url)        
    }
    
    onAddpromotion(data): Observable<any> {
        let url = this.basicUrl + "/promotions?page=1&limit=1000";
        return this.network.doPut(url, data)
    }

    onUpdatePromotion(id, data) : Observable<any> {

        let url = this.basicUrl + "/promotions/" + id;
        return this.network.doPost(url, data)
    }

    onDeletePromotion(id): Observable<any> {
        let url = this.basicUrl + "/promotions/" + id;
        return this.network.doDelete(url)
    }

    uploadPicture(data) : Observable<any> {
        let url = this.basicUrl + "/image/upload";
        return this.network.doPostPictures(url,data)
    }



}