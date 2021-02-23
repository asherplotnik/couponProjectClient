package app.core;


import java.time.LocalDate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import app.core.couponProjectExceptions.DaoException;
import app.core.entities.Coupon;
import app.core.loginManager.LoginManager;
import app.core.services.CompanyService;

@SpringBootApplication
@EnableTransactionManagement
public class TestCompanyService {

	public static void main(String[] args) {
		try {
			ConfigurableApplicationContext ctx = SpringApplication.run(TestCompanyService.class, args);
			LoginManager loginManager = ctx.getBean(LoginManager.class);
			CompanyService cService = (CompanyService)loginManager.login("comp1@email1", "111",1);
			Coupon coupon = new Coupon(3, "yoyoyo", "blblbl", LocalDate.of(2020, 1, 1), LocalDate.of(2020, 1, 2), 25, 25.58, "age8");
			cService.addCoupon(coupon);
			System.out.println(cService.getCompanyCoupons());
			Coupon updatedCoupon = new Coupon(2 , 3, "updsate", "updsate", LocalDate.of(2020, 1, 1), LocalDate.of(2020, 1, 2), 25, 25.58, "age8");
			cService.updateCoupon(updatedCoupon);
			cService.deleteCoupon(1);
			cService.deleteCoupon(4);
			
		} catch (DaoException e) {
			e.getLocalizedMessage();
		}
	}
}