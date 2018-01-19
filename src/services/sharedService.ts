import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TranslateService } from 'ng2-translate';


let temp = {}
let temp1 = []
let temp2 = {}
let productId = null
@Injectable()
export class SharedService {

    constructor(public translate : TranslateService){}
    // public temp = {}

    send(data) {

        temp = data
        console.log("Send Form data in Shared Service: ")
        console.log(temp)
    }

    sendSpecifications(spec){

        temp1 = spec
        console.log("Send Specification data in Shared Service: ")
        console.log(temp1)
    }

    fetchSpecifications(){
        console.log("fetch spec: ")
        console.log(temp1)
        return temp1
    }

    fetchData() {

        console.log("fetch Form Data: ")
        console.log(temp)
        return temp   
    }

    sendProductId(id){
        productId = id
        console.log(productId)
    }
    fetchProductId(){
        console.log("product Id: " + productId)
        return productId
    }

    sendStockData(data){
        temp2 = data
        console.log(temp2)
    }
    fetchStockData(){
        return temp2
    }
    
}