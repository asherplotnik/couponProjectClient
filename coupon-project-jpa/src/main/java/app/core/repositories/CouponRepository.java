package app.core.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import app.core.entities.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {

	List<Coupon> getCouponsByCustomersId(Integer customerId);

	List<Coupon> getCouponsByCompanyId(int id);

	@Modifying
	@Query(value = "update coupon set category_id=?2, title=?3,description=?4,start_date=?5,end_date=?6,price=?7, amount=?8, image=?9 where id=?1", nativeQuery = true)
	void updateCoupon(int id, int categoryId, String title, String description, LocalDate startDate,LocalDate endDate, double price, int amount,String image);

}
