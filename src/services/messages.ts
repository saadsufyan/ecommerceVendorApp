import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})

export class MessagesService{
    // private basicUrl = "http://34.214.14.69/gomallbackend/public/index.php/vendor";
    private basicUrl = "http://nazikgcc.com/app/gomallbackend/public/index.php/vendor";
    constructor (public network : NetworkService) {}

    onGetAllMessages(){
        let url = this.basicUrl + "/messages?page=1&limit=1000";
        return this.network.doGet(url)
    }
    onGetChatMessage(id){
        let url = this.basicUrl + "/messages/" + id;
        return this.network.doGet(url)
    }
    onSendChatMessages(id,data) : Observable<any> {
        let url = this.basicUrl + "/messages/" + id;
        return this.network.doPost(url,data)      
    }
    onGetContacts() : Observable<any> {
        let url = this.basicUrl + "/contacts?page=1&limit=1000";
        return this.network.doGet(url)
    }
    onGetContactDetails(id) : Observable<any> {
        let url = this.basicUrl + "/contacts/" + id;
        return this.network.doGet(url)
    }

}