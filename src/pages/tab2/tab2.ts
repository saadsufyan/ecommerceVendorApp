import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { ProductsService } from '../../services/products';
import { NetworkService } from '../../services/network';
import { SharedService } from '../../services/sharedService';
import { AlertView } from '../../uicomponents/alert';
import $ from "jquery";
import { Input } from '@angular/core/src/metadata/directives';

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
 
  @ViewChild('one') d1:ElementRef; 
  
  public items: number[] = [1,2,3,4,5]

  public arabicValue : string

  public id = null
  public spec = null
  public specArabic = null

  public specid = null
  public specname = null
  public specname_ar = null

  public value_en = null 
  public value_ar = null
  
  public inputs = []

  public specBox = []

  public valueBox= []
  public valueBox_ar = []

  public specBox1 = [
    {
      key_id: this.specid,
      key: this.specname,
      key_ar: this.specname,
      values: this.valueBox,
      values_ar : this.valueBox_ar
    }
  ]

  public temp
  public itemList = []




  public englishName : string
  


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
  public errorMessage : any = ""
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App, public sharedservice: SharedService, public productservice: ProductsService, public popup: AlertView) {
  
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
    // this.navCtrl.parent.select(2,{data: "val"});

    
    var spec_num = 1;
    let specifications = []
    $( ".specificationbox" ).each(function(index,value) {

      
      var spec_class = {
        key_id:null,
        key:null,
        key_ar:null,
        values:[],
        values_ar:[]
      };  
      
      var spec_name_en = "spec_name_"+spec_num+"_en";

      var spec_name_ar = "spec_name_"+spec_num+"_ar";

      var spec_name_en_val = $('#'+spec_name_en).val();
      var spec_name_ar_val = $('#'+spec_name_ar).val();
      // console.log(spec_name_en_val);
      // console.log($('#'+spec_name_ar).val());

      spec_class.key_id = spec_num;
      spec_class.key = spec_name_en_val;
      spec_class.key_ar = spec_name_ar_val;
      

      // console.log("spec_class.spec_name");
      // console.log(spec_class);


      
    var inputs = 1;

      $( ".spec_"+spec_num+"_value" ).each(function() {
        var value_box_en = "spec_"+spec_num+"_value_"+inputs+"_en";
        var value_box_ar = "spec_"+spec_num+"_value_"+inputs+"_ar";
        inputs++;

        var value_box_en_val = $('#'+value_box_en).val();
        var value_box_ar_val = $('#'+value_box_ar).val();
        // console.log("value "+value_box_en);
        // console.log();
        // console.log($('#'+value_box_ar).val());


        spec_class.values.push(value_box_en_val);
        spec_class.values_ar.push(value_box_ar_val);
      });
  console.log("complete data");
  console.log(spec_class);
// this.get_value_box('asd');
specifications.push(spec_class);

      spec_num++;
    });

    let my_data = this.data;

  console.log("complete data");
  console.log(specifications);


  // this.data.specifications = specifications

  // my_data.specification = specifications;

    // this.productservice.OnAddProduct().subscribe(res=>{
      
    //   if(res.status){
    //     console.log(res)
    //   }
    // },    
    // err => {
    //   console.log(err)
    //   this.popup.hideLoader()
    //   this.errorMessage = JSON.parse(err._body)
    //   this.errorMessage = this.errorMessage.error.message[0]
    //   this.popup.showToast(this.errorMessage,1500,'bottom',false,"")
    // })

  }


  get_value_box(spec_num){
    // alert(spec_num)
    var spec = document.getElementById('addvalue_spec_'+spec_num)
    $('#addvalue_spec_'+spec_num).append(this.get_value_html(spec_num));
    // $("spec_values_"+spec_num).append(this.get_value_html(spec_num));
  }

  get_value_html(spec_num){

    var spec_value = $( ".spec_"+spec_num+"_value").length + 1;
    console.log(spec_value)
    
    return `<tr>
    <td>Specifications Value <br>(In English)</td>
    <td><input class="spec_`+spec_num+`_value" id="spec_`+spec_num+`_value_`+spec_value+`_en" name="spec_`+spec_num+`_value_`+spec_value+`_en"  placeholder="specification value"></td>
  </tr>
  <tr>
    <td>Specifications Value <br>(In Arabic)</td>
    <td><input id="spec_`+spec_num+`_value_`+spec_value+`_ar" name="spec_`+spec_num+`_value_`+spec_value+`_ar"  placeholder="قيمة المواصفات"></td>
  </tr>`;
  }
  

  getSpec(x,y){

    this.specbox = true

    var id : any = this.specBox.length + 1;
    console.log("outside box: " + id)

    let temp = {
      key_id : id,
      key: x,
      key_ar: y,
      
    }
    this.specBox.push(temp)
    console.log(this.specBox)

  }

  clickonDiv(id){

    console.log("div Id: " + id)

    var val_Id = this.valueBox.length + 1;

    console.log("inside box: " +val_Id)

    let tempEng = [
      this.value_en 
    ]
    let temp_ar = [
      this.value_ar
    ]

    console.log("empty");
    console.log(this.valueBox);

    // this.valueBox.push()
    this.valueBox.push(tempEng)
    console.log("not empty");
    console.log(this.valueBox)

  }

}
