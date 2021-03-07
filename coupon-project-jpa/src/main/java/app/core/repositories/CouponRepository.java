package app.core.repositories;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import app.core.entities.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {

	List<Coupon> getCouponsByCustomersId(Integer customerId);
	
	List<Coupon> getCouponsByCustomersIdAndCategoryId(Integer customerId, int categoryId);

	List<Coupon> getCouponsByCustomersIdAndPriceLessThan(Integer customerId, double maxPrice);
	
	List<Coupon> getCouponsByCompanyId(Integer companyId);
	
	List<Coupon> getCouponsByCompanyIdAndCategoryId(Integer companyId, int categoryId);
	
	List<Coupon> getCouponsByCompanyIdAndPriceLessThan(Integer customerId, double maxPrice);
	
	List<Coupon> getCouponsByEndDateBefore(LocalDate date);
	
}
