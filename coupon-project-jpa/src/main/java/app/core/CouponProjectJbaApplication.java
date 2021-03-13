package app.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import app.core.couponProjectExceptions.DaoException;
import app.core.services.AdminService;
//import app.core.services.CompanyService;
//import app.core.services.CustomerService;
import app.core.loginManager.LoginManager;
@SpringBootApplication
@EnableTransactionManagement
public class CouponProjectJbaApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(CouponProjectJbaApplication.class, args);
		LoginManager loginManager = ctx.getBean(LoginManager.class);
		AdminService aService;
		try {
			aService = (AdminService)loginManager.login("admin@admin.com", "admin", 0);
			System.out.println(aService.getAdminDetails());
		} catch (DaoException e) {
			e.printStackTrace();
		}
	}

}