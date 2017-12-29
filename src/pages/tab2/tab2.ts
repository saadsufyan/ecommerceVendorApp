import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { ProductsService } from '../../services/products';
import { NetworkService } from '../../services/network';
import { SharedService } from '../../services/sharedService';
import { AlertView } from '../../uicomponents/alert';
import $ from "jquery";

/**
 * Generated class for the Tab2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
  providers: [ProductsService, NetworkService, SharedService,AlertView]
})



export class Tab2Page {
  public data = {}
  public specs =   [
    {
      key_id: 1,
      key: "color",
      key_ar: "اللون",
      values: [
        "blue",
        "green"
      ],
      values_ar: [
        "أزرق",
        "أخضر"
      ]
    },
    {
      key_id: 2,
      key: "size",
      key_ar: "اللون",
      values: [
        "15",
        "17"
      ],
      values_ar: [
        "15_ar",
        "17_ar"
      ]
    }    
  ]

  public specbox : boolean = false
  public name
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App, public sharedservice: SharedService,) {
  
    this.data = this.sharedservice.fetchData()
    console.log(this.data)
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab2Page');
  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
  }



  goBack(){
    this.app.navPop()
  }

  goToStocks(){
    this.navCtrl.parent.select(2);
  }
  
  get_spec_box(){

    // alert(" im here ")
    $('#specifications').append(this.get_spec_html()) ;
    
  }

  get_value_box(spec_num){
    alert("im here")
    console.log("im here ")
    $("spec_values_"+spec_num).append(this.get_value_html(spec_num));
  }

  get_spec_html(){

// return '<span>some spec</span>';

// this.get_value_box(11)
// $(function(){
//   alert("<Me running")
// })




    var spec_num =  $('.promotion-box').length+1;
    console.log(spec_num)


    return `<div class="col-xs-12 promotion-box" >
		<table class="table table-promotion ltr">
			<tr>
				<td>Specifications Name <br>(In English)</td>
				<td><input id="" placeholder="specification name"></td>
			</tr>
			<tr>
				<td>Specifications Name <br>(In Arabic)</td>
				<td><input id="" placeholder="اسم المواصفات"></td>
			</tr>
		</table>
		<table class="table table-promotion ltr" id="spec_values_`+spec_num+`">
			<tr>
				<td>Specifications Value <br>(In English)</td>
				<td><input class="spec_values_`+spec_num+`" id="" placeholder="specification value"></td>
			</tr>
			<tr>
				<td>Specifications Value <br>(In Arabic)</td>
				<td><input class="spec_values_`+spec_num+`"  id="" placeholder="قيمة المواصفات"></td>
			</tr>
		</table>
		<div class="col-xs-12 text-center">
			<br>
			<button class="btn btn-nazik black sm" (click)="get_value_box(`+spec_num+`)">Add Value</button>
			<br><br>
		</div>
  </div>`;
  
  }

  get_value_html(spec_num){

    var spec_value = $( "spec_values_"+spec_num).length + 1;
    console.log(spec_value)

    return `<tr>
    <td>Specifications Value <br>(In English)</td>
    <td><input id="" name="spec_`+spec_num+`_value_`+spec_value+`_en"  placeholder="specification value"></td>
  </tr>
  <tr>
    <td>Specifications Value <br>(In Arabic)</td>
    <td><input id="" name="spec_`+spec_num+`_value_`+spec_value+`_ar"  placeholder="قيمة المواصفات"></td>
  </tr>`;
  }
  

  getSpec(){

    this.specbox = true
  }
}
