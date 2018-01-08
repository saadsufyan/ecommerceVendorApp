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
  


  public data
  public specs : any



  public specbox : boolean = false
  public name
  public errorMessage : any = ""

  public specbutton : boolean = false
  public productid :any
  public stock_data : any
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App, public sharedservice: SharedService, public productservice: ProductsService, public popup: AlertView) {
  
    this.data = this.sharedservice.fetchData()
    console.log("Form Data: ")
    console.log(this.data)    

    this.specs = this.sharedservice.fetchSpecifications()
    console.log("Spec data: ")
    this.productid = this.sharedservice.fetchProductId()
    console.log(this.specs)
    if(this.productid == null){
      this.specbutton = true
    }
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
    var update_spec = this.specs
    var product_id = this.productid

    console.log(update_spec)
    
    $( ".specificationbox" ).each(function(index,value) {

      
      
      var spec_class = {
        key_id:null,
        key:null,
        key_ar:null,
        values:[],
        values_ar:[]
      };  

      var update_spec_class = {
        key_id : update_spec.key_id,
        key : update_spec.key,
        key_ar : update_spec.key_ar,
        values : [],
        values_ar : []
      }

      console.log(update_spec_class)
      
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

        spec_class.values.push(value_box_en_val);
        spec_class.values_ar.push(value_box_ar_val);

        update_spec_class.values.push(value_box_en_val);
        update_spec_class.values_ar.push(value_box_ar_val);
      });
  console.log("complete data");
  console.log(spec_class);

  console.log(update_spec_class)
// this.get_value_box('asd');

console.log(product_id)
  if(product_id != null){
    
    specifications.push(update_spec_class)
  }
  else{
    specifications.push(spec_class)
  }


      spec_num++;
    });

    let my_data = this.data;

  //  this.data.specifications 
   console.log(this.data.specifications)
   this.data.specifications = specifications

   console.log("complete data");
   console.log(this.data)

  console.log("complete specification data");
  console.log(specifications);


  if(this.productid == null){
    this.popup.showLoader()
    console.log("add product: ")
    this.productservice.OnAddProduct(this.data).subscribe(res=>{
      
      if(res.status){
        console.log(res)

        this.popup.hideLoader()

        this.stock_data = res.response 
        this.sharedservice.sendStockData(this.stock_data)
        console.log(this.stock_data)

         this.navCtrl.parent.select(2);
        
      }
    },    
    err => {
      console.log(err)
      this.popup.hideLoader()
      this.errorMessage = JSON.parse(err._body)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage,1500,'bottom',false,"")
    })
  }
  else if (this.productid != null){
    this.popup.showLoader()
    console.log("update product")
    this.productservice.onUpdateProductDetails(this.productid,this.data).subscribe(res=>{
      
      if(res.status){
        console.log(res)
        this.popup.hideLoader()
        this.navCtrl.parent.select(2);
      }
    },    
    err => {
      console.log(err)
      this.popup.hideLoader()
      this.errorMessage = JSON.parse(err._body)
      this.errorMessage = this.errorMessage.error.message[0]
      this.popup.showToast(this.errorMessage,1500,'bottom',false,"")
    })
  }


  }


  addValue(spec_num,TXT){
TXT = ''||TXT;


    // alert(spec_num)
    var spec = document.getElementById('addvalue_spec_'+spec_num)
    $('#addvalue_spec_'+spec_num).append(this.get_value_html(spec_num,TXT));
    // $("spec_values_"+spec_num).append(this.get_value_html(spec_num));
  }

  get_value_html(spec_num,TXT){
    TXT = ''||TXT;
    var spec_value = $( ".spec_"+spec_num+"_value").length + 1;
    console.log(spec_value)
    
    return `<tr>
    <td>Specifications Value <br>(In English)</td>
    <td><input value=`+TXT+` class="spec_`+spec_num+`_value" id="spec_`+spec_num+`_value_`+spec_value+`_en" name="spec_`+spec_num+`_value_`+spec_value+`_en"  placeholder="specification value"></td>
  </tr>
  <tr>
    <td>Specifications Value <br>(In Arabic)</td>
    <td><input id="spec_`+spec_num+`_value_`+spec_value+`_ar" (keyup)="validation_val_ar(`+spec_num+`,`+spec_value+`)" name="spec_`+spec_num+`_value_`+spec_value+`_ar"  placeholder="قيمة المواصفات"></td>
  </tr>`;
  }
  

  validation_spec_ar(key_id){

    var tb = $('#spec_name_'+key_id+'_ar');
    var tb_value: any = tb.val();        

      if(!this.validate_arabic_without_spaces(tb_value)){
        tb.val('');
        tb.attr('placeholder','Only Arabic Allowed');
      }      
  }
  

  validation_val_ar(key_id,value_id){
    
    var tb = $('#spec_'+key_id+'_value_'+value_id+'_ar');
    var tb_value: any = tb.val();           

      if(!this.validate_arabic_without_spaces(tb_value)){
        tb.val('');
        tb.attr('placeholder','Only Arabic Allowed');
      }      
  }

  rejex_arabic(){
    return /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd]|[\n])*$/g;
  }

  validate_arabic_with_spaces(arabic){

    if(!(this.rejex_arabic().test(arabic)===true)){
      return false;
  }
    return true;
  }

  validate_arabic_without_spaces(arabic){

    var arabic = (arabic.replace(/ /g,''));

    return this.validate_arabic_with_spaces(arabic);
  }




  removeSpec(){
    this.specBox.pop()
    console.log(this.specBox)
  }

  removeValue(id){

    var spec_box_sel = '#addvalue_spec_'+id;

    var trs = $(spec_box_sel+' tr').length;

    if(trs<3){
      return;
    }

var last_tr = spec_box_sel+' tr:last';

    var is_fixed = $(last_tr).hasClass( "fixed" );

    if(!is_fixed){
      $(last_tr).remove()
      $(last_tr).remove()
    }    
  }

  addSpec(x,y){

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
