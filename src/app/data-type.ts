export interface signUp{
    name:String;
    email:String;
    password:String;
}
export interface logIn{
    email:String;
    password:String;
}
export interface product{
    id:string
    name:String;
    price:number;
    category:String;
    color:String;
    description:String;
    imageURL:String;
    quantity:number |undefined;
    productId:string |undefined;
}

export interface cart{
    id:string|undefined;
    name:String;
    price:number;
    category:String;
    color:String;
    description:String;
    imageURL:String;
    quantity:number |undefined,
    productId:string,
    userId:string
}