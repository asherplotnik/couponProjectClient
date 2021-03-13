package app.core.services;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import app.core.entities.CategoryEnum;
import app.core.entities.Company;
import app.core.entities.Coupon;
import app.core.couponProjectExceptions.DaoException;

@Service
@Transactional
@Scope("prototype")
public class CompanyService extends ClientService {
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
		if (comp != null && comp.getPassword().equals(password)) {
			this.companyId = comp.getId();
			return true;
		}
		return false;
	}

	public int getCompanyId() {
		return companyId;
	}

	public void addCoupon(Coupon coupon) throws DaoException {
		if (couponRepository.getFirstByTitleAndCompanyId(coupon.getTitle(), companyId).isPresent()) {
			throw new DaoException("Add coupon failed. Duplicate title for same company!!!");
		}
		if (coupon.getCategory_id() <= 0 || coupon.getCategory_id() > CategoryEnum.values().length) {
			throw new DaoException("Add coupon failed. Category id out of range!!!");
		}
		if (coupon.getStart_date().isAfter(coupon.getEnd_date())) {
			throw new DaoException("Add coupon failed. Coupon end date before coupon start date!!!");
		}
		Company company = getCompanyDetails();
		company.addCoupon(coupon);

	}

	public void deleteCoupon(int id) throws DaoException {

		// database foreign key restrictions on delete cascade will automatically delete
		// all purchases
		// with permission of Eldar
		Optional<Coupon> chkCoupon = couponRepository.findById(id);
		if (chkCoupon.isPresent() && chkCoupon.get().getCompany().getId() == companyId) {
			couponRepository.deleteById(id);
			System.out.println("Coupon deleted successfuly!");
		} else {
			throw new DaoException("Delete coupon Failed - Coupon not found for this company");
		}

	}

	public void updateCoupon(Coupon coupon) throws DaoException {

		Coupon couponDb;
		Optional<Coupon> co = couponRepository.findById(coupon.getId());
		if (co.isEmpty()) {
			throw new DaoException("failed to update - Coupon dont exist");
		} else {
			couponDb = co.get();
			if (couponDb.getCompany().getId() != companyId) {
				throw new DaoException("failed to update - Coupon belong to different company");
			}
		}
		Optional<Coupon> duplicate = couponRepository.getFirstByTitleAndCompanyId(coupon.getTitle(), companyId);
		if (duplicate.isPresent() && duplicate.get().getId() > coupon.getId()) {
			throw new DaoException("Update coupon failed. Duplicate title for same company!!!");
		}

		if (coupon.getCategory_id() <= 0 || coupon.getCategory_id() > CategoryEnum.values().length) {
			throw new DaoException("Update coupon failed - Category id out of range!!!");
		}
		if (coupon.getStart_date().isAfter(coupon.getEnd_date())) {
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

	}

	public List<Coupon> getCompanyCoupons() {
		return couponRepository.getCouponsByCompanyId(companyId);
	}

	public List<Coupon> getCompanyCouponsByCategory(int id) {
		return couponRepository.getCouponsByCompanyIdAndCategoryId(companyId, id);
	}

	public List<Coupon> getCompanyCouponsByMaxPrice(double maxPrice) {
		return couponRepository.getCouponsByCompanyIdAndPriceLessThan(companyId, maxPrice);
	}

	public Company getCompanyDetails() {
		Optional<Company> opt = companyRepository.findById(companyId);
		if (opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

}
