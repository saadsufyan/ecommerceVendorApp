import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { ProductsService } from '../../services/products';
import { NetworkService } from '../../services/network';
import { SharedService } from '../../services/sharedService';
import { AlertView } from '../../uicomponents/alert';
import { UtilProvider } from '../../providers/util/util';
import { TranslateproviderProvider } from '../../providers/translateprovider/translateprovider';
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

  valueStrings  = []
  tempArry = ['tab2_page','specification_name_en', 'english', 'specification_name_en_placeholder' , 'specification_name_ar', 'arabic', 'specification_name_ar_placeholder', 'specification_value_en', 'english','specification_value_en_placeholder' , 'specification_value_ar', 'arabic','specification_value_ar_placeholder', 'add_value', 'remove_value' , 'specification_add' , 'specification_remove', 'proceed_to_stock']
  public checklang : boolean = false

  public parameter_val_en : any = "Specification value in English"
  public parameter_val_ar : any = "Specification value in Arabic"

  constructor(public translateprovider : TranslateproviderProvider, public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App, public sharedservice: SharedService, public productservice: ProductsService, public popup: AlertView) {
  
    console.log('ionViewDidLoad Tab2Page');
    this.data = this.sharedservice.fetchData()
    console.log("Form Data: ")
    console.log(this.data)    

    // this.specs = this.navParams.get('datatab1')
    this.specs = this.sharedservice.fetchSpecifications()
    console.log("Spec data: "+this.specs)


    for(var item in this.tempArry){
      this.translateprovider.getTranslation(this.tempArry[item]).subscribe((value)=>{
        let title = this.tempArry[item]
        this.valueStrings.push({
           title : value
        })
      })
    }
    console.log(this.valueStrings)



  }

  ionViewDidLoad() {

    console.log("im in ViewDidLoad")


    // $(function(){try()});
    this.try()
    

  }
  ionViewWillEnter(){
    console.log("im in ViewWillEnter")
    this.viewCtrl.showBackButton(false);

    this.data = this.sharedservice.fetchData()
    console.log("Form Data: ")
    console.log(this.data)    

    // this.specs = this.navParams.get('datatab1')
    this.specs = this.sharedservice.fetchSpecifications()
    console.log("Spec data: "+this.specs)
    

    this.productid = this.sharedservice.fetchProductId()
    console.log(this.specs)
    console.log(this.productid)
    if(this.productid == null){
      this.specbutton = true
    }

    // this.try()

    let lang  = localStorage.getItem('lang')
    if(lang == "ar"){
      this.checklang = true
    }else{
      this.checklang = false
      }        

  }

  goBack(){
    // this.app.navPop()
    this.sharedservice.sendSpecifications([])
    this.sharedservice.sendProductId(null)
    this.navCtrl.parent.select(0)
  }

  ngAfterViewInit(){
    // this.try()
  }

  try(){
    console.log(this.specs)
    for(var i = 0 ; i<this.specs.length;i++){
      console.log(this.specs)
      console.log(this.specs[i])
          this.addSpec(i); 
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

  console.log("complete data")
  console.log(this.data)
   console.log(this.data.specifications)
   this.data.specifications = specifications

  if(this.productid == null){
    
    console.log("add product: ")
    // console.log("remove this if statement for add product")
    

      console.log(this.data)
      console.log(this.data.specifications.length)
      this.popup.showLoader()
      this.productservice.OnAddProduct(this.data).subscribe(res=>{
      
        if(res.status){
          console.log(res)
  
          this.popup.hideLoader()
  
          this.stock_data = res.response 
          this.sharedservice.sendStockData(this.stock_data)
          console.log(this.stock_data)
  
           this.navCtrl.parent.select(2, {animation: 'left'});
          
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
    
    console.log("update product")
    console.log(this.data)

      this.popup.showLoader()
      this.productservice.onUpdateProductDetails(this.productid,this.data).subscribe(res=>{
      
        if(res.status){
          console.log(res)
          this.popup.hideLoader()
          this.stock_data = res.response 
          console.log(this.stock_data)
          this.sharedservice.sendStockData(this.stock_data)
          this.navCtrl.parent.select(2, {animation: 'left'});
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
      console.log(is_fixed)
      if(is_fixed == true){

        var class_fixed = "class='fixed'";
        var disable = 'disabled';
      }
      else{
        var class_fixed = "";
        var disable = '';
      }
    


      let lang  = localStorage.getItem('lang')
      console.log(lang)
  
      if(lang == "ar"){
        console.log("its arabic")
        var parameter_val_en = "اسم القيمة بالإنجليزية (Large, Black,..)"
        var parameter_val_ar =  "اسم القيمة بالعربية ( كبير ، اسود،..)"
  
      }else{
        console.log("its English")
        var parameter_val_en = "Specification value in English"
        var parameter_val_ar =  "Specification value in Arabic"
        }
  

      var spec_value = $( ".spec_"+spec_num+"_value").length + 1;      
      
      return `<tr `+class_fixed+`>
      <td>`+parameter_val_en+`</td>
      <td><input `+disable+` value=`+value+` class="spec_`+spec_num+`_value" id="spec_`+spec_num+`_value_`+spec_value+`_en" name="spec_`+spec_num+`_value_`+spec_value+`_en"  placeholder="specification value"></td>
    </tr>
    <tr>
      <td>`+parameter_val_ar+`</td>
      <td><input  `+disable+` value=`+value_ar+` id="spec_`+spec_num+`_value_`+spec_value+`_ar" (keyup)="validation_val_ar(`+spec_num+`,`+spec_value+`)" name="spec_`+spec_num+`_value_`+spec_value+`_ar"  placeholder="قيمة المواصفات"></td>
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



      if(this.specBox.length > this.specs.length){
        this.specBox.pop()
        console.log(this.specBox)
      }
  }

  removeValue(id){
    console.log(id)
    // console.log(this.specs[id].values)

    


    var spec_box_sel = '#addvalue_spec_'+id;

    var trs = $(spec_box_sel+' tr').length;
    
    if(typeof this.specs[id-1] === 'undefined') {
      // does not exist
  }
  else{
    if(this.specs[id-1].values.length == (trs/2)){
      return;
    }    
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
    console.log(spec_id)

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
      console.log(spec)
      console.log(id)
      if(spec.length > spec_id){
        var spec_input_en = '#spec_name_'+id+'_en'
        var spec_input_ar = '#spec_name_'+id+'_ar'
  
        $(spec_input_en).prop('disabled', true);
        $(spec_input_ar).prop('disabled', true);
  
        var value_input_en = '#spec_'+id+'_value_1_en'
        $(value_input_en).prop('disabled', true);
        var value_input_ar = '#spec_'+id+'_value_1_ar'
        $(value_input_ar).prop('disabled', true);
      }else{
        var spec_input_en = '#spec_name_'+id+'_en'
        var spec_input_ar = '#spec_name_'+id+'_ar'
  
        $(spec_input_en).prop('disabled', false);
        $(spec_input_ar).prop('disabled', false);
  
        var value_input_en = '#spec_'+id+'_value_1_en'
        $(value_input_en).prop('disabled', false);
        var value_input_ar = '#spec_'+id+'_value_1_ar'
        $(value_input_ar).prop('disabled', false);
      }


      

      if(((id-1)in spec) ){

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
}
