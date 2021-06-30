export interface Order {
    id:number,
    userId:number,
    firstName:string,
    lastName:string,
    address:string,
    phoneNumber:string,
    orderCode:string
    statusId?:number;
    date?:Date;
    totalPrice?:number;
    payWithCard?:boolean;
    desc?:string;
}