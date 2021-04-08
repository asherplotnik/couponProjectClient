import CouponModel from "./CouponModel";

class UploadFormModel {
    
    public id:number;
    public categoryId:number;
	public title:string; 
	public description:string;
	public startDate:Date;
	public endDate:Date;
	public amount:number;
	public price:number;
	public image:string;
    public imageFile:File;
   
}

export default UploadFormModel;