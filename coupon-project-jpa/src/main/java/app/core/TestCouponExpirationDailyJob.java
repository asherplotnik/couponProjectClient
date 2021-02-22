package app.core;
import java.time.LocalDate;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import app.core.couponProjectExceptions.DaoException;
import app.core.dailyJob.CouponExpirationDailyJob;
import app.core.entities.Company;
import app.core.entities.Coupon;
import app.core.loginManager.LoginManager;
import app.core.services.CompanyService;


public class TestCouponExpirationDailyJob {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(CouponProjectJbaApplication.class, args);
		CouponExpirationDailyJob job = ctx.getBean(CouponExpirationDailyJob.class);
		try {
			Thread clearJob = new Thread(job, "cedj1");
			System.out.println("==========  main program  =========");
			LoginManager loginManager = ctx.getBean(LoginManager.class); 
			CompanyService companyService = (CompanyService)loginManager.login("comp1@email1", "111", 1);
			if  (companyService == null)
				throw new DaoException("Login Failed");
			Company company = companyService.getCompanyDetails();
			companyService.addCoupon(new Coupon(0, 8, "expiredCoupon1", "coupon1 description", LocalDate.of(2020,10,15), LocalDate.of(2020,12,15), 15, 5.5, "image"));
			System.out.println(companyService.getCompanyDetails());
			System.out.println(companyService.getCompanyCoupons(company));
			clearJob.start();
			Thread.sleep(5000);
			System.out.println("============after strt job=========");
			System.out.println(companyService.getCompanyCoupons(company));
			System.out.println("Bye Bye...");
			clearJob.interrupt();
			clearJob.join();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (DaoException e) {
			e.printStackTrace();
		}

	}

}
