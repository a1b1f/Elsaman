import { Component, OnInit } from '@angular/core';
import { AccountServices } from 'src/Services/Account';
import { addfav, favServices } from 'src/Services/Fav';
import { productservice } from 'src/Services/productservice';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {

  FavtItem: addfav[] = [];
  userId:string=this.acc.getCurrentUserId();

  constructor(    private fav: favServices,
    private productservice: productservice,
    private acc: AccountServices) { }

  ngOnInit(): void {
    this.show();

  }
  show() {
    this.fav.GetFav().subscribe((res) => {
      this.FavtItem = res.data.data;
      //console.log(res.data.data)
      //console.log(this.FavtItem);
      this.GetRecipeNames();
      this.GetRecipeImages();

    });
}
GetRecipeNames() {
  this.FavtItem.forEach((element) => {
    console.log(element)
    this.fav
      .GetRecipeById(element.recipe_ID)
      .subscribe((res) => {
        //console.log(res);
        (element.recipe_Name = res.data.nameEN)

      });
  });
}
GetRecipeImages() {
  this.FavtItem.forEach((element) => {
    console.log(element)
    this.fav
      .GetRecipeById(element.recipe_ID)
      .subscribe((res) => {
        console.log(res);
        (element.recipeImg = res.data.imageUrl)

      });
  });
}
remove(FavID: number,recipe_ID:number) {
  this.fav.RempveFav(FavID).subscribe((res) =>{
    console.log(res);
    this.show()});
}

}
