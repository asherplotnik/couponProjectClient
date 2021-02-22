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
	private Customer customer;
	/**
	 * constructor
	 * 
	 * @param username
	 * @param password
	 * @throws DaoException
	 */
	
//	public CustomerService(String email, String password) throws DaoException {
//		if (!login(email,password)) {
//			throw new DaoException("Login customer failed!!!");
//		}
//	}
	
	public CustomerService() {
	}
	
	public boolean login(String email, String password) {
		Customer cust = customerRepository.getByEmail(email);
		if (cust != null && cust.getPassword().equals(password)) {
			this.customer = cust;
			return true;
		} 
		return false;
	}

	public int getCustomerId() {
		try {
			assureLogged();
			return customer.getId();
		} catch (DaoException e) {
			e.printStackTrace();
		}
		return -1;
	}
	
	public void purchaseCoupon(Coupon coupon) {
		try {
			assureLogged();
			Coupon temp=null;
			Optional<Coupon> opt = couponRepository.findById(coupon.getId());
			if (opt.isPresent()) {
				temp = opt.get();
			}
					if (!coupon.equals(temp)) {
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
			customer.addCoupon(coupon);
			//customerRepository.addCoupon(customer.getId(),coupon.getId());
			System.out.println("Purchased coupon successfully !");
			
		} catch (DaoException e) {
			System.out.println(e.getMessage());
			//e.printStackTrace();
		}
	}
	
	public List<Coupon> getCustomerCoupons(){
		try {
			assureLogged();
			return couponRepository.getCouponsByCustomersId(customer.getId());
		} catch (DaoException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List<Coupon> getCustomerCouponsByCategory(CategoryEnum category){
		List<Coupon> list = getCustomerCoupons();
		List<Coupon> cList = new ArrayList<>();
		for (Coupon curr : list) {
			if (curr.getCategory_id() == category.ordinal()+1) {
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
	
	private void assureLogged() throws DaoException {
		if (this.customer == null)
			throw new DaoException("CUSTOMER NOT LOGGED IN!!!");
	}
	
	public Customer getCustomerDetails() {
		try {
			assureLogged();
			return this.customer;
		} catch (DaoException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
}
