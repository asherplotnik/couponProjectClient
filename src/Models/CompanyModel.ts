import CouponModel from "./CouponModel";

class CompanyModel {
    public id:number=0;
    public name:string="";
    public email:string="";
    public password:string="";
    public coupons:CouponModel[];
}

export default CompanyModel;