import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})

export class ProductsService{
    // private basicUrl = "http://34.214.14.69/gomallbackend/public/index.php/vendor";
    private basicUrl = "http://nazikgcc.com/app/gomallbackend/public/index.php/vendor";
    constructor (public network : NetworkService) {}

    onGetTopProducts() : Observable<any> {
        let url = this.basicUrl + "/top_products";
        return this.network.doGet(url)
    }

    onGetAllProducts() : Observable<any> {
        let url = this.basicUrl  + "/products";
        return this.network.doGet(url)
    }
    onGetProductDetails(id) : Observable<any> {
        let url = this.basicUrl + "/products/" + id;
        return this.network.doGet(url)
    }
    OnAddProduct(data) : Observable<any> {
        let url = this.basicUrl + "/products";
        return this.network.doPut(url, data)
    }
    onUpdateProductDetails(id, data) : Observable<any> {
        let url = this.basicUrl + "/products/" + id
        return this.network.doPost(url, data)
    }
    onGetAllParentCategory() : Observable<any> {
        let url = this.basicUrl + "/categories";
        console.log(url)
        return this.network.doGet(url)
    }

    onGetSubCategory(cat_id) : Observable<any> {
        let url = this.basicUrl + "/categories/" + cat_id + "/subcategories";
        console.log(url)
        return this.network.doGet(url)
    }
    onGetParentCategoryOfSpecificSubCategory(sub_cat_id) : Observable<any> {
        let url = this.basicUrl + "/subcategories/" + sub_cat_id + "/category";
        console.log(url)
        return this.network.doGet(url)
    }

    onDeleteProduct(id) : Observable<any> {
        let url = this.basicUrl + "/products/" + id;
        return this.network.doDelete(url)
    }

    uploadPicture(data) : Observable<any> {
        let url = this.basicUrl + "/image/upload";
        return this.network.doPostPictures(url,data)
    }


}