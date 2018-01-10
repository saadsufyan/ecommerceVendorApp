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
  public tempValue_en : any = []
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App, public sharedservice: SharedService, public productservice: ProductsService, public popup: AlertView) {
  
    this.data = this.sharedservice.fetchData()
    console.log("Form Data: ")
    console.log(this.data)    

    this.specs = this.sharedservice.fetchSpecifications()
    console.log("Spec data: "+this.specs)






  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab2Page');

    // $(function(){try()});
    this.try()
    

  }
  ionViewWillEnter(){
    this.viewCtrl.showBackButton(false);
    // this.try()

  }

  goBack(){
    this.app.navPop()
  }

  ngAfterViewInit(){
    // this.try()
  }

  try(){
    for(var i = 0 ; i<this.specs.length;i++){
      console.log(this.specs)
      console.log(this.specs[i])
          this.addSpec(i); 
    }

    this.productid = this.sharedservice.fetchProductId()
    console.log(this.specs)
    if(this.productid == null){
      this.specbutton = true
    }


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




      
      var spec_name_en = "spec_name_"+spec_num+"_en";

      var spec_name_ar = "spec_name_"+spec_num+"_ar";

      var spec_name_en_val = $('#'+spec_name_en).val();
      var spec_name_ar_val = $('#'+spec_name_ar).val();

      spec_class.key_id = spec_num;
      spec_class.key = spec_name_en_val;
      spec_class.key_ar = spec_name_ar_val;
      
    var inputs = 1;

      $( ".spec_"+spec_num+"_value" ).each(function() {
        var value_box_en = "spec_"+spec_num+"_value_"+inputs+"_en";
        var value_box_ar = "spec_"+spec_num+"_value_"+inputs+"_ar";
        inputs++;

        var value_box_en_val = $('#'+value_box_en).val();
        var value_box_ar_val = $('#'+value_box_ar).val();

        spec_class.values.push(value_box_en_val);
        spec_class.values_ar.push(value_box_ar_val);


      });
  console.log("complete data");
  console.log(spec_class);

  console.log(product_id)

    specifications.push(spec_class)

      spec_num++;
    });

    let my_data = this.data;

  //  this.data.specifications 
   console.log(this.data.specifications)
   this.data.specifications = specifications

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


  addValue(spec_num,value,value_ar,is_fixed){

if(value=='undefined'){
  value = '';
}

  
    value_ar = ''||value_ar;

    // alert(spec_num)
    var spec = document.getElementById('addvalue_spec_'+spec_num)
    $('#addvalue_spec_'+spec_num).append(get_value_html(spec_num,value,value_ar,is_fixed));

    function get_value_html(spec_num,value,value_ar,is_fixed){

      if(is_fixed){
        var class_fixed = "class='fixed'";
      }
      else{
        var class_fixed = "";
      }
    
      var spec_value = $( ".spec_"+spec_num+"_value").length + 1;      
      
      return `<tr `+class_fixed+`>
      <td>Specifications Value <br>(In English)</td>
      <td><input value=`+value+` class="spec_`+spec_num+`_value" id="spec_`+spec_num+`_value_`+spec_value+`_en" name="spec_`+spec_num+`_value_`+spec_value+`_en"  placeholder="specification value"></td>
    </tr>
    <tr>
      <td>Specifications Value <br>(In Arabic)</td>
      <td><input  value=`+value_ar+` id="spec_`+spec_num+`_value_`+spec_value+`_ar" (keyup)="validation_val_ar(`+spec_num+`,`+spec_value+`)" name="spec_`+spec_num+`_value_`+spec_value+`_ar"  placeholder="قيمة المواصفات"></td>
    </tr>`;
    }
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
    console.log(id)
    console.log(this.specs[id].values)

    var spec_input_en = '#spec_name_'+id+'_en'
    console.log(spec_input_en)

    var spec_box_sel = '#addvalue_spec_'+id;

    var trs = $(spec_box_sel+' tr').length;

    if(this.specs[id].values.length == (trs/2)){
      $(spec_input_en).prop('disabled', true);  
      return;
    }

    if(trs<3){
      return;
    }

var last_tr = spec_box_sel+' tr:last';

    var is_fixed = $(last_tr).hasClass( "fixed" );
    console.log('check');
console.log($(last_tr));
console.log(is_fixed);
    if(!is_fixed){
      $(last_tr).remove()
      $(last_tr).remove()
    }    
  }

  addSpec(spec_id){

    this.specbox = true

    var spec_index : any = this.specs.length; 

    var id : any = this.specBox.length + 1;
    console.log("outside box: " + id)

    let temp = {
      key_id : id,
    }
    this.specBox.push(temp)
 if(this.specs.length > 0){


    setTimeout(set_params, 1000, id,this.specs,this.addValue);
   
}    

    function set_params(id, spec,addValue) {
      // alert(id);

      
      
      spec = spec[(id-1)];
      var values = spec.values;
      var values_ar = spec.values_ar;

      $('#spec_name_'+id+'_en').val(spec.key);
      $('#spec_name_'+id+'_ar').val(spec.key_ar);

      $('#spec_'+id+'_value_1_en').val(values[0]);
      $('#spec_'+id+'_value_1_ar').val(values_ar[0]);

        for(var val_index=1 ; val_index<values.length ; val_index++){

          addValue(id,values[val_index],values_ar[val_index],true);
  
        console.log(('#spec_'+id+'_value_'+(val_index+1)+'_en'))
      }
  }
  
  }
}
