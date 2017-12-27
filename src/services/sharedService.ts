import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


let temp = {}
@Injectable()
export class SharedService {

    SharedService(){}
    // public temp = {}

    send(data:{}) {

        temp = data
        console.log(temp)
    }


    fetchData() {

        console.log(temp)
        return temp
        
    }
    
}