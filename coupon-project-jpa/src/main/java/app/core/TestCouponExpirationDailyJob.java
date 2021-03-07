package app.core;
import java.time.LocalDate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import app.core.couponProjectExceptions.DaoException;
import app.core.dailyJob.CouponExpirationDailyJob;
import app.core.entities.Coupon;
import app.core.loginManager.LoginManager;
import app.core.services.CompanyService;

@SpringBootApplication
@EnableTransactionManagement
public class TestCouponExpirationDailyJob {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(CouponProjectJbaApplication.class, args);
		CouponExpirationDailyJob job = ctx.getBean(CouponExpirationDailyJob.class);
		try {
			Thread clearJob = new Thread(job, "cedj1");
			System.out.println("==========  main program  =========");
			LoginManager loginManager = ctx.getBean(LoginManager.class); 
			CompanyService companyService = (CompanyService)loginManager.login("comp@email", "123", 1);

			Coupon coupon = new Coupon(3, "yoyoyo", "blblbl", LocalDate.of(2020, 1, 1), LocalDate.of(2022, 1, 4), 25, 25.58, "age8");
			companyService.addCoupon(coupon);
			
			
			System.out.println(companyService.getCompanyDetails());
			System.out.println(companyService.getCompanyCoupons());
			clearJob.start();
			Thread.sleep(5000);
			System.out.println("============after start job=========");
			System.out.println(companyService.getCompanyCoupons());
			System.out.println("Bye Bye...");
			clearJob.interrupt();
			clearJob.join();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (DaoException e) {
			System.out.println(e.getLocalizedMessage());
		}

	}

}
