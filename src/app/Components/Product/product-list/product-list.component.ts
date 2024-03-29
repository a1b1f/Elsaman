import { Component, OnInit } from '@angular/core';
import { productservice } from 'src/Services/productservice';
import { Category } from 'src/ViewModels/category';
import { Product } from 'src/ViewModels/product';
import { PagingViewModel } from 'src/ViewModels/result-view-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  page: number = 1; //current page number
  count: number = 1; //total pages

  //number of elements to get form database per request
  tableSize: number = 15;
  tableSizes: any = [1, 5, 10, 20];
  Products:Product[]=[];
  unfiltered:Product[]=[];
  filtered:Product[]=[];
  Categories:Category[]=[];
  productName:string="";
  // selected:number[]=[];
  constructor( private ProductService: productservice) { }

  ngOnInit(): void {
    this.fetchData()
  }
  fetchData() {
    //console.log(this.tableSize,this.page)
    this.ProductService.getProduct(this.tableSize,this.page).subscribe(res => {
     console.log(res.data)

      let response = res.data as PagingViewModel
      // this.page = response.pageIndex;
      // this.tableSize = response.pageSize;
      this.Products = res.data as Product[];
      this.count =this.Products.length;

      console.log(this.Products);
      
      this.filtered=this.Products;
      this.getProductByName();
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
   // console.log(event);
    this.page = event;
    this.fetchData();
  }


  getName(val:string){
    this.productName=val;
  }

  getProductByName(){
    //console.log(this.recipeName)
    if(this.productName!=="")
        {
        this.ProductService.getProductByName(this.productName).subscribe(res=>
          {
            // console.log(res);
            this.filtered=res.data.data

            // this.Products=this.unfiltered.filter(i=>i.isDeleted == false)
          })
        }
        else{
          this.ProductService.getProduct(this.tableSize,this.page).subscribe(res => {
            console.log(res);
            
            let response = res.data as PagingViewModel
            // this.page = response.pageIndex;
            this.tableSize = 9;
            this.count = res.data.length;
            this.Products = res.data as Product[];})

        }
  }
  getByCategory(cId:any){
    // this.Categories.filter(i=>{
    //   if(i.nameAR==cName)
    //   {
    //     i.isChecked=!i.isChecked
    //   }
    // })
    // this.Products=[];
    // this.Categories.forEach(c=>{
    //   if(c.isChecked==true )
    //   {
    //     if(c.nameAR=="الكل"){
    //       this.ProductService.getProduct(this.tableSize,this.page).subscribe(res => {
    //         let response = res.data as PagingViewModel
    //         this.page = response.pageIndex;
    //         this.tableSize = response.pageSize;
    //         this.count = response.count;
    //         this.Products = response.data as Product[];
    //         this.Products= this.Products.filter(i=>  i.nameAR.includes(this.productName))
    //       })
    //     }
    //     else {
    //     this.ProductService.getByCategory(c.nameAR).subscribe(res=>
    //       {
    //         //console.log(res);
    //         this.unfiltered=res.data.data
    //         this.Products.push(...this.unfiltered.filter(i=>  i.nameAR.includes(this.productName)))
    //       })
    //     }

    //   }
    // })
    // console.log(cId);
    // if(!this.selected.includes(cId))
    // {this.selected.push(cId)
    //   this.selected.forEach(s=>{

    //     this.filtered=this.Products.filter(p=>parseInt(p.categoryID)==s)
    //   })
    // }
    // else
    // {
    //   this.filtered=this.Products
    //   this.selected=[]
    // }
    // console.log(this.selected);

    this.filtered = [];

    //We are assigning the selected cat products to the product list and if no cat is selected nothing happens
    for (var i = 0; i < this.selected.length; i++) {
      var lst = this.Products.filter(x => parseInt(x.categoryID) == this.selected[i].id);
      for (var j = 0; j < lst.length; j++) {
        this.filtered.push(lst[j]);
      }
      this.filtered = this.filtered.filter(p=>p.nameAR.includes(this.productName));
    }

    //If no checkbox is selected assign original product list to product list
    if (this.selected.length == 0) {
      this.filtered = this.Products.filter(p=>p.nameAR.includes(this.productName));
    }
    
  }

  get selected() {
    //Get all the selected brands
    return this.Categories.filter(opt => opt.isChecked)
  }

}
