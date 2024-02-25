

export interface Category {
    id:number;
    category:string;
    subCategory:string;
}

export interface Offer {
    id:number;
    title:string;
    discount:number;

}
export interface Product
{
    productId:number;
    title:string
    description:string;
    category:Category;
    offer:Offer;
    price:number;
    quantity:number;
    imagename:string;
}
export interface SuggestedProduct{
    bannerimage:string;
    category:Category;
}

export interface NavigationItem{
    category:string;
    subcategories:string[];

}

export interface UserDetail
{
    UserId:number;
    FirstName:string;
    LastName:string;
    Address:string;
    Mobile:string;
    Username:string;
    Password:string
    CreatedAt:string;
    ModifiedAt:string;
}

    