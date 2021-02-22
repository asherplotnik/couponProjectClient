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
	private int companyId;
	
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
			this.companyId = comp.getId();
			return true;
		} 
		return false;
	}
	
	public int getCompanyId() {
		return companyId;
	}
	
	public void addCoupon(Coupon coupon) {
		try {
			Company company = companyRepository.getOne(companyId);
			List<Coupon> coupons = getCompanyCoupons(company);
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
			coupon.setCompany(company);
			company.addCoupon(coupon);
			couponRepository.save(coupon);
		} catch (DaoException e) {
			System.out.println(e.getMessage());
		}
	}
	
	public void deleteCoupon(int id) {
		try {
			//database foreign key restrictions on delete cascade will automatically delete all purchases
			//with permission of Eldar
			Optional<Coupon> chkCoupon = couponRepository.findById(id);
			
			if (chkCoupon.isPresent() && chkCoupon.get().getCompany().getId() == companyId) {
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
			Coupon couponDb;
			Optional<Coupon> co = couponRepository.findById(coupon.getId());
			if (co.isEmpty()) {
				throw new DaoException("failed to update - Coupon dont exist");
			} else {
				couponDb = co.get();
				if(couponDb.getCompany().getId() != companyId) {
					throw new DaoException("failed to update - Coupon belong to different company");
				}
			}
			Company company = companyRepository.getOne(companyId);
			List<Coupon> coupons = getCompanyCoupons(company);
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
			couponDb.setCategory_id(coupon.getCategory_id());
			couponDb.setTitle(coupon.getTitle());
			couponDb.setDescription(coupon.getDescription());
			couponDb.setStart_date(coupon.getStart_date());
			couponDb.setEnd_date(coupon.getEnd_date());
			couponDb.setPrice(coupon.getPrice());
			couponDb.setAmount(coupon.getAmount());
			couponDb.setImage(coupon.getImage());
		} catch (DaoException e) {
			System.out.println(e.getMessage());
		}
	}
	
	public List<Coupon> getCompanyCoupons(Company company){
		company.setCoupons(couponRepository.getCouponsByCompanyId(company.getId()));
		return company.getCoupons();
	}
	
	public List<Coupon> getCompanyCouponsByCategory(CategoryEnum category){
		List<Coupon> categoryCoupons = new ArrayList<>();
		Company company = companyRepository.getOne(companyId);
		List<Coupon> coupons = getCompanyCoupons(company); 
		for (Coupon coupon : coupons ) {
			if( coupon.getCategory_id() == category.ordinal()+1) {
				categoryCoupons.add(coupon);
			}
		}
		return categoryCoupons;
	}
	
	public List<Coupon> getCompanyCouponsByMaxPrice(double maxPrice){
		List<Coupon> maxCoupons = new ArrayList<>();
		Company company = companyRepository.getOne(companyId);
		List<Coupon> companyCoupons = getCompanyCoupons(company); 
		for (Coupon coupon : companyCoupons ) {
			if( coupon.getPrice() <= maxPrice) {
				maxCoupons.add(coupon);
			}
		}
		return maxCoupons;
	}
	
	public Company getCompanyDetails() {
		return companyRepository.getOne(companyId);
	}
	
	
}
