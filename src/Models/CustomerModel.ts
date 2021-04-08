import CouponModel from "./CouponModel";

class CustomerModel {
    public id:number;
    public first_name:string;
    public last_name:string;
    public email:string;
    public password:string;
    public coupons:CouponModel[];

}

export default CustomerModel;
