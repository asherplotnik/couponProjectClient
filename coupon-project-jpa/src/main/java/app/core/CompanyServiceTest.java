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
public class CompanyServiceTest {

	public static void main(String[] args) {
		try {
			ConfigurableApplicationContext ctx = SpringApplication.run(CompanyServiceTest.class, args);
			LoginManager loginManager = ctx.getBean(LoginManager.class);
			CompanyService cService = (CompanyService)loginManager.login("comp1@email1", "111",1);
			Coupon coupon = new Coupon(1, 3, "new8", "new8", LocalDate.of(2020, 1, 1), LocalDate.of(2020, 1, 2), 25, 25.58, "age8");
	//		companyService.addCoupon(coupon);
	//		System.out.println(companyService.getCompanyCoupons());
			cService.updateCoupon(coupon);
		} catch (DaoException e) {
			e.printStackTrace();
		}
	}
}