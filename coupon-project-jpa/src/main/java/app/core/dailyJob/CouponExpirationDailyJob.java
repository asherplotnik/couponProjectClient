package app.core.dailyJob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import app.core.services.DailyJobService;

/**
 * this runnable runs while program work concurrently clear expired coupons
 * and wait 24 hours.
 * @author ASHER
 *
 */
@Component
public class CouponExpirationDailyJob implements Runnable {
	@Autowired
	ApplicationContext ctx;
	
	/**
	 * clear expired coupons and wait 24 hours.
	 */
	@Override
	public void run() {
		try {
			DailyJobService couponDb = ctx.getBean(DailyJobService.class);
			while (true) {
					couponDb.clearExpiredCoupons();
					System.out.println();
					System.out.println("cleared daily expired coupons");
					System.out.println();
					Thread.sleep(86400000);
			}
		} catch (InterruptedException ex) {
			System.out.println("clear job stopped");
			//ex.printStackTrace();
		}
	}
}
