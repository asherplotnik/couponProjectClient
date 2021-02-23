package app.core.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import app.core.couponProjectExceptions.DaoException;
import app.core.entities.Coupon;
import app.core.entities.Customer;
import app.core.entities.CategoryEnum;

@Service
@Transactional
public class CustomerService extends ClientService{
	private int customerId;
	
	public CustomerService() {
	}
	
	public boolean login(String email, String password) {
		Customer cust = customerRepository.getByEmail(email);
		if (cust != null && cust.getPassword().equals(password)) {
			this.customerId = cust.getId();
			return true;
		} 
		return false;
	}

	public int getCustomerId() {
		return customerId;
	}
	
	public void purchaseCoupon(Coupon coupon) {
		try {
			Coupon temp=null;
			Optional<Coupon> opt = couponRepository.findById(coupon.getId());
			if (opt.isPresent()) {
				temp = opt.get();
			} else {				
				throw new DaoException("Cant puchase this coupon  - Coupon don't exists!!!");
			}
			if (temp.getAmount() == 0) {
				throw new DaoException("Cant puchase this coupon  - out of stock!!!");
			}
			if	( temp.getEnd_date().isBefore(LocalDate.now()) ) {	
				throw new DaoException("Cant puchase this coupon  - Coupon expiration date passed already.");
			}
			
			if (getCustomerCoupons().contains(temp)) {
				throw new DaoException("Cant puchase this coupon more than once - Coupon already purchased.");
			}
			Customer customer = getCustomerDetails(); 
			temp.setAmount(temp.getAmount()-1);
			customer.addCoupon(temp);
			System.out.println("Purchased coupon successfully !");
			
		} catch (DaoException e) {
			System.out.println(e.getMessage());
		}
	}
	
	public Coupon getCouponById(int id){
		Optional<Coupon> opt = couponRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		return null;
	}
	
	public List<Coupon> getCustomerCoupons(){
		return couponRepository.getCouponsByCustomersId(customerId);
	}
	
	public List<Coupon> getCustomerCouponsByCategory(int i){
		List<Coupon> list = getCustomerCoupons();
		List<Coupon> cList = new ArrayList<>();
		for (Coupon curr : list) {
			if (curr.getCategory_id() == i) {
				cList.add(curr);
			}
		}
		return cList;
	}
	
	public List<Coupon> getCustomerCouponsByMaxPrice(double maxPrice ){
		List<Coupon> list = getCustomerCoupons();
		List<Coupon> cList = new ArrayList<>();
		for (Coupon curr : list) {
			if (curr.getPrice() <= maxPrice) {
				cList.add(curr);
			}
		}
		return cList;
	}
	
	public Customer getCustomerDetails() {
		Optional<Customer> opt =  customerRepository.findById(customerId);
		if (opt.isPresent()) {
			return opt.get();
		}
		return null;
	}
	
	
}
