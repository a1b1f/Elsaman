import { Component, Input, OnInit } from '@angular/core';
import { AccountServices } from 'src/Services/Account';
import { addcart, CartServices } from 'src/Services/Cart';
import { productservice } from 'src/Services/productservice';
import { StoreService } from 'src/Services/StoreService';
import { Category } from 'src/ViewModels/category';
import { Product } from 'src/ViewModels/product';
import { Rating } from 'src/ViewModels/Rating';
import { PagingViewModel } from 'src/ViewModels/result-view-model';
import { Store } from 'src/ViewModels/Store';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page: number = 1; //current page number
  count: number = 1; //total pages

  //number of elements to get form database per request
  tableSize: number = 17;
  tableSizes: any = [1, 5, 10, 20];
  products:Product[]=[];
  unfiltered:Product[]=[];
  filtered:Product[]=[];
  Rating:Rating[]=[];
  Categories:Category[]=[];
  productName:string="";
  Store:Store[]=[];
  storeName:string="";
  @Input() product:Product= new Product();
CartItems:addcart[]=[];
 @Input() rateval:number=0;
 //isInCart:boolean=false;
 btnDis:string="btnDis";
 btn:string="btn";
  hidden:string="hidden";
 AddTOCart(productID:number) {
console.log(productID)
    this.cart.AddCart(1,productID,this.acc.getCurrentUserId()).subscribe(res=>this.product.isInCart=res.data);

}
  constructor(private cart:CartServices, private acc :AccountServices,
    private ProductService: productservice,private StoreServices:StoreService) { }

  ngOnInit(): void {
    this.fetchData()
    this.StoreServices.getStore(this.tableSize,this.page).subscribe(res =>
      {
        // console.log(res);
        this.Store=res.data.data
      })
  }
  fetchData() {
    //console.log(this.tableSize,this.page)
    this.ProductService.getProduct(this.tableSize,this.page).subscribe(res => {
     console.log(res.data)

      let response = res.data as PagingViewModel
      // this.page = response.pageIndex;
      // this.tableSize = response.pageSize;
      this.products = res.data as Product[];
      this.count =this.products.length;

      console.log(this.products);

      this.filtered=this.products;
      // this.getProductByName();
      this.ProductService.getCategories().subscribe(res=>
        {
          console.log(res)
          this.Categories=res.data ;
          // var c = new Category();
          // c.nameAR="الكل";
          // this.Categories.push(c);
        })
    })
  }
  onTableDataChange(event: any) {
    console.log(event);
    this.page = event;
    this.fetchData();

      // this.RecipeService.getCategories().subscribe(res=>
      //   {

      //     this.Categories=res.data ;
      //   })


  }

// resturant

getNameres(valu:string){
  this.storeName=valu;
}




getRestByName(){
  //console.log(this.restName)
  if(this.storeName!=="")
      {
      this.StoreServices.getStoreByName(this.storeName) .subscribe(res=>
        {
          console.log(res);
          this.Store=res.data
        })
      }

}

  getByCategory(cName:string){
    this.Categories.filter(i=>{
      if(i.nameAR==cName)
      {
        i.isChecked=!i.isChecked
      }
    })
    this.products=[];
    this.Categories.forEach(c=>{
      if(c.isChecked==true)
      {
        this.ProductService.getByCategory(c.nameAR).subscribe(res=>
          {
            console.log(res);
            this.unfiltered=res.data
            this.products.push(...this.unfiltered.filter(i=>i.isDeleted == false && i.nameAR.includes(this.productName)))
          })

      }

    })
  console.log(this.Categories)
  }
  getName(val:string){
    this.productName=val;
  }


  getRecipesByName(){
    console.log(this.productName)
    if(this.productName!=="")
        {
        this.ProductService.getProductByName(this.productName).subscribe(res=>
          {
            console.log(res);
            this.unfiltered=res.data
            this.products=this.unfiltered.filter(i=>i.isDeleted == false)
          })
        }
  }

}
