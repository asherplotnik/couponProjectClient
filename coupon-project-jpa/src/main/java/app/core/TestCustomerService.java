package app.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import app.core.couponProjectExceptions.DaoException;
import app.core.entities.Coupon;
import app.core.loginManager.LoginManager;
import app.core.services.CustomerService;

@SpringBootApplication
@EnableTransactionManagement
public class TestCustomerService {
	public static void main(String[] args) {
		try {
			ConfigurableApplicationContext ctx = SpringApplication.run(TestCompanyService.class, args);
			LoginManager loginManager = ctx.getBean(LoginManager.class);
			CustomerService cService = (CustomerService) loginManager.login("cust3@email", "333", 2);
			Coupon coupon = new Coupon(3);
			cService.purchaseCoupon(coupon); 
			System.out.println("customer id: ["+ cService.getCustomerId() + "] coupons=====");
			System.out.println(cService.getCustomerCoupons());
			System.out.println("customer id: ["+ cService.getCustomerId() + "] coupons by category=====");
			System.out.println(cService.getCustomerCouponsByCategory(1));
			System.out.println("customer id: ["+ cService.getCustomerId() + "] coupons by price=====");
		    System.out.println(cService.getCustomerCouponsByMaxPrice(16));
			System.out.println();
			
		} catch (DaoException e) {
			e.printStackTrace();
		}
	}
}
