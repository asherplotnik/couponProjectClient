package app.core.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import app.core.entities.CategoryEnum;
import app.core.entities.Company;
import app.core.entities.Coupon;
import app.core.couponProjectExceptions.DaoException;

@Service
@Transactional
public class CompanyService extends ClientService{
	private Company company;
	
//	public CompanyService(String email, String password) throws DaoException {
//		if (!login(email,password)) {
//			throw new DaoException("Login company failed!!!");
//		}
//	}
	
	
	public CompanyService() {
	}
	
	public boolean login(String email, String password) {
		Company comp = companyRepository.getByEmail(email);
		if (comp!=null && comp.getPassword().equals(password)) {
			this.company = comp;
			return true;
		} 
		return false;
	}
	
	public int getCompanyId() {
		try {
			assureLogged();
			return company.getId();
		} catch (DaoException e) {
			e.printStackTrace();
		}
		return -1;
	}
	
	public void addCoupon(Coupon coupon) {
		try {
			assureLogged();
			List<Coupon> coupons = getCompanyCoupons();
			for (Coupon current : coupons) {
				if(current.getTitle().equals(coupon.getTitle())) {
					throw new DaoException("Add coupon failed. Duplicate title for same company!!!");
				}
			}
			if (coupon.getCategory_id() <= 0 || coupon.getCategory_id() > CategoryEnum.values().length) {
				throw new DaoException("Add coupon failed. Category id out of range!!!");
			}
			if(coupon.getStart_date().isAfter(coupon.getEnd_date())) {
				throw new DaoException("Add coupon failed. Coupon end date before coupon start date!!!");				
			}
			coupon.setCompany(this.company);
			company.addCoupon(coupon);
			couponRepository.save(coupon);
		} catch (DaoException e) {
			System.out.println(e.getMessage());
			//e.printStackTrace();
		}
	}
	
	public void deleteCoupon(int id) {
		try {
			//database foreign key restrictions on delete cascade will automatically delete all purchases
			//with permission of Eldar
			assureLogged();
			Optional<Coupon> chkCoupon = couponRepository.findById(id);
			
			if (chkCoupon.isPresent() && chkCoupon.get().getCompany().getId() == this.company.getId()) {
				couponRepository.deleteById(id);
			} else {
				throw new DaoException("Delete Failed - Coupon not found for this company");
			}
		} catch (DaoException e) {
			System.out.println(e.getMessage());
		}
	}
	
	public void updateCoupon(Coupon coupon) {
		try {
			assureLogged();
			Optional<Coupon> co = couponRepository.findById(coupon.getId());
			if (co.isEmpty()) {
				throw new DaoException("failed to update - Coupon dont exist");
			} else {
				if(co.get().getCompany().getId() != company.getId()) {
					throw new DaoException("failed to update - Coupon belong to different company");
				}
			}
			List<Coupon> coupons = getCompanyCoupons();
			for (Coupon current : coupons) {
				if(current.getTitle() == coupon.getTitle() && current.getId() != coupon.getId()) {
					throw new DaoException("Update coupon failed. Duplicate title for same company!!!");
				}
			}
			if (coupon.getCategory_id() <= 0 || coupon.getCategory_id() > CategoryEnum.values().length) {
				throw new DaoException("Update coupon failed - Category id out of range!!!");
			}
			if(coupon.getStart_date().isAfter(coupon.getEnd_date())) {
				throw new DaoException("Update coupon failed - Coupon end date before coupon start date!!!");				
			}
			couponRepository.updateCoupon(coupon.getId(), coupon.getCategory_id(), coupon.getTitle(), coupon.getDescription(),
					coupon.getStart_date(),coupon.getEnd_date(),coupon.getPrice(),coupon.getAmount(),coupon.getImage());
		} catch (DaoException e) {
			System.out.println(e.getMessage());
		}
	}
	
	public List<Coupon> getCompanyCoupons(){
		try {
			assureLogged();
			company.setCoupons(couponRepository.getCouponsByCompanyId(company.getId()));
			return company.getCoupons();
		} catch (DaoException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List<Coupon> getCompanyCouponsByCategory(CategoryEnum category){
		List<Coupon> categoryCoupons = new ArrayList<>();
		List<Coupon> coupons = getCompanyCoupons(); 
		for (Coupon coupon : coupons ) {
			if( coupon.getCategory_id() == category.ordinal()+1) {
				categoryCoupons.add(coupon);
			}
		}
		return categoryCoupons;
	}
	
	public List<Coupon> getCompanyCouponsByMaxPrice(double maxPrice){
		List<Coupon> maxCoupons = new ArrayList<>();
		List<Coupon> companyCoupons = getCompanyCoupons(); 
		for (Coupon coupon : companyCoupons ) {
			if( coupon.getPrice() <= maxPrice) {
				maxCoupons.add(coupon);
			}
		}
		return maxCoupons;
	}
	
	public Company getCompanyDetails() {
		try {
			assureLogged();
			return this.company;
		} catch (DaoException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	private void assureLogged() throws DaoException {
		if (this.company == null)
			throw new DaoException("COMPANY NOT LOGGED IN!!!");
	}
	
}
