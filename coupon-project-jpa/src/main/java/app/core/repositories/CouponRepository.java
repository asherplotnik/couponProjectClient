package app.core.repositories;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import app.core.entities.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {

	List<Coupon> getCouponsByCustomersId(Integer customerId);

	List<Coupon> getCouponsByCompanyId(int id);
	
	List<Coupon> getCouponsByEndDateBefore(LocalDate date);
	
	
}
