package app.core;

import java.time.LocalDate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import app.core.couponProjectExceptions.DaoException;
import app.core.entities.Company;
import app.core.entities.Coupon;
import app.core.entities.Customer;
import app.core.loginManager.LoginManager;
import app.core.services.AdminService;

@SpringBootApplication
@EnableTransactionManagement
public class AdminServiceTest {

	public static void main(String[] args) {
		try {
			ConfigurableApplicationContext ctx = SpringApplication.run(AdminServiceTest.class, args);
			LoginManager loginManager = ctx.getBean(LoginManager.class);
   		    AdminService adminService = (AdminService) loginManager.login("admin@admin.com", "admin", 0);

			Company cm1 = new Company(0, "comp1", "comp1@email1", "111");
			Company cm2 = new Company(0, "comp2", "comp1@email2", "222");
			Company cm3 = new Company(0, "comp3", "comp1@email3", "333");
			Coupon cp1 = new Coupon(0, 1, "coupon1", "coupon1desc", LocalDate.of(2021, 10, 1),
					LocalDate.of(2021, 10, 10), 15, 15.5, "image1");
			Coupon cp2 = new Coupon(0, 2, "coupon1", "coupon2desc", LocalDate.of(2021, 8, 1), LocalDate.of(2021, 8, 10),
					15, 15.5, "image2");
			Coupon cp3 = new Coupon(0, 1, "coupon3", "coupon3desc", LocalDate.of(2021, 7, 1), LocalDate.of(2021, 7, 10),
					14, 14.5, "image3");
			Coupon cp4 = new Coupon(0, 2, "coupon4", "coupon4desc", LocalDate.of(2021, 6, 1), LocalDate.of(2021, 6, 10),
					13, 13.5, "image4");
			Coupon cp5 = new Coupon(0, 1, "coupon5", "coupon5desc", LocalDate.of(2021, 7, 1), LocalDate.of(2021, 5, 10),
					12, 12.5, "image5");
			Coupon cp6 = new Coupon(0, 2, "coupon6", "coupon6desc", LocalDate.of(2021, 4, 1), LocalDate.of(2021, 4, 10),
					11, 11.5, "image6");
			cm1.addCoupon(cp1);
			cm1.addCoupon(cp2);
			cm2.addCoupon(cp3);
			cm2.addCoupon(cp4);
			cm3.addCoupon(cp5);
			cm3.addCoupon(cp6);
			Customer c1 = new Customer(0, "cust1", "cust1f", "cust1@email", "111");
			Customer c2 = new Customer(0, "cust2", "cust2f", "cust2@email", "222");
			Customer c3 = new Customer(0, "cust3", "cust3f", "cust3@email", "333");

			adminService.addCompany(cm1);
			adminService.addCompany(cm2);
			adminService.addCompany(cm3);
			adminService.addCustomer(c1);
			adminService.addCustomer(c2);
			adminService.addCustomer(c3);
		} catch (DaoException e) {
			e.printStackTrace();
		}
	}

}