import CompanyModel from "./CompanyModel";
import CustomerModel from "./CustomerModel";

class CouponModel {
   
    public id:number;
    public title:string;
    public categoryId:number;
    public description:string;
    public startDate:Date;
    public endDate:Date;
    public amount:number;
    public price:number;
    public image:string;
    public company:CompanyModel;
    public customers:CustomerModel[];
}

export default CouponModel;

