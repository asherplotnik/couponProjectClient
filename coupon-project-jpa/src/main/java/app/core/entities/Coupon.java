package app.core.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;


/**
 * 
 * Coupon class for database access
 * @author ASHER
 *

 *
 */
@Entity
public class Coupon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private int category_id;
	private String title; 
	private String description;
	private LocalDate startDate;
	private LocalDate endDate;
	private int amount;
	private double price;
	private String image;
	@ManyToOne
	private Company company;
	@ManyToMany(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH })
	@JoinTable(name = "coupon_customer", joinColumns = @JoinColumn(name = "coupon_id"), inverseJoinColumns = @JoinColumn(name = "customer_id"))
	List<Customer> customers;
	
	public Coupon(int id, int category_id, String title, String description, LocalDate start_date,
			LocalDate end_date, int amount, double price, String image) {
		this.id = id;
		this.category_id = category_id;
		this.title = title;
		this.description = description;
		this.startDate = start_date;
		this.endDate = end_date;
		this.amount = amount;
		this.price = price;
		this.image = image;
	}
	
	public Coupon(int id) {
		this.id = id;
	}
	
	public Coupon() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public int getCategory_id() {
		return category_id;
	}

	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getStart_date() {
		return startDate;
	}

	public void setStart_date(LocalDate start_date) {
		this.startDate = start_date;
	}

	public LocalDate getEnd_date() {
		return endDate;
	}

	public void setEnd_date(LocalDate end_date) {
		this.endDate = end_date;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	

	public List<Customer> getCustomers() {
		return customers;
	}
	
	public void addCustomer(Customer customer) {
		if (this.customers == null) {
			this.customers = new ArrayList<>();
		}
		customers.add(customer);
	}

	public void setCustomers(List<Customer> customers) {
		this.customers = customers;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + amount;
		result = prime * result + category_id;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((endDate == null) ? 0 : endDate.hashCode());
		result = prime * result + id;
		result = prime * result + ((image == null) ? 0 : image.hashCode());
		long temp;
		temp = Double.doubleToLongBits(price);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((startDate == null) ? 0 : startDate.hashCode());
		result = prime * result + ((title == null) ? 0 : title.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Coupon other = (Coupon) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ID: " + id + " , COMPANY ID: " + company.getId() + ", CATEGORY ID: " + category_id + " , TITLE: " + title
				+ " , DESCRIPTION: " + description + " , START DATE: " + startDate + " , END DATE: " + endDate + " , AMOUNT: "
				+ amount + " , PRICE: " + price + " , IMAGE: " + image;
	}
	
	
	
	
	
	
}
