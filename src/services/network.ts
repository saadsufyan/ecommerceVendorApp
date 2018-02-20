import { Injectable , Component} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
// import { NativeHttpFallbackD, NativeHttpModuleD } from 'ionic-native-http-connection-backend';
import { Observable } from "rxjs/Rx";
// import { HTTP } from '@ionic-native/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()

export class NetworkService{
    
    public ios_Client_key : string = 'Z29tYWxsLWFwcC1pb3M6NWFlZTMyZjItYTgyOS00Y2I2LWE5MzgtOGQxZmYwYjJhMTg4DQo=';
    public android_client_key : string = 'Z29tYWxsLWFwcC1hbmRyb2lkOjY2ZmU3MzBmLWQ2M2UtNDI2OS04ZmJhLTkwMGYxMDY4ZDdmOQ==';

    constructor(public http : Http){

    }
    doPost(url,postdata) : any {
        return this.http.post(url,postdata, this.getHeaders()).map(res => res.json());
    }
    doPut(url,postdata) : any {
        return this.http.put(url,postdata, this.getHeaders()).map(res => res.json());
    }
    doGet(url) : any {
        return this.http.get(url, this.getHeaders()).map(res => res.json());
    }
    doDelete(url) : any {
        return this.http.delete(url, this.getHeaders()).map(res => res.json());
    }
    doPostPictures(url,postdata) : any {
        console.log(url)
        console.log(postdata)

        return this.http.post(url, postdata, this.getMultiPartHeaders()).map(res =>  res.json())
    }

    getMultiPartHeaders() : any {

        let user = JSON.parse(localStorage.getItem('user')) 
        var token = user.access_token
         var header = {
            'Authorization': 'Bearer '+token            
        };
        console.log(header)
        let headers = new Headers(header);
        let options = new RequestOptions({ headers: headers });
        return options;
    }    

    getHeaders() : any {
        let userIsLoggedIn : any = localStorage.getItem('isLoggedIn');
        console.log(userIsLoggedIn, 'from network layer')
        if(userIsLoggedIn == "true"){
            let user = JSON.parse(localStorage.getItem('user'))
            // console.log(user)
            var token = user.access_token
            console.log("Token " + user.access_token)
            return this.getAuthHeaders(token)
        }
        else if (userIsLoggedIn == "false"){
            return this.getClientHeaders();
        }
        else{
            return this.getClientHeaders();
        }
    }

    getClientHeaders() : any {
        var header = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic' + ' ' + this.android_client_key,
            'client-id': ' gomall-app-android'
        };
        let headers = new Headers(header);
        let options = new RequestOptions({headers:headers});
        return options;
    }

    getAuthHeaders(token): any{
        var header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
        let headers = new Headers(header);
        let options = new RequestOptions({headers:headers});
        return options;
    }
}