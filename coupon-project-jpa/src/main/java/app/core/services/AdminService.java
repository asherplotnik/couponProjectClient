package app.core.services;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import app.core.couponProjectExceptions.DaoException;
import app.core.entities.Company;
import app.core.entities.Customer;

@Service
@Transactional
public class AdminService extends ClientService {
	private boolean loggedIn = false;
	
//	public AdminService(String email, String password) throws DaoException {
//		if (!login(email,password)) {
//			throw new DaoException("Login admin failed!!!");
//		}
//	}

	public AdminService( ) {
	}
	
	public boolean login(String email, String password) {
		if (email.equals("admin@admin.com") && password.equals("admin")) {
			loggedIn = true;
			return true;
		} else {
			return false;
		}
	}

	public void addCompany(Company company) {
		try {
			if (company.getName().length() == 0 || company.getEmail().length() == 0) {
			}
			String check = checkDuplicateCompany(company);
			if (check.equals("name")) {
				throw new DaoException("Company name exists already!!!");
			}
			if (check.equals("email")) {
				throw new DaoException("Company email exists already!!!");
			}
			companyRepository.save(company);
			System.out.println("Company saved Successfully");
		} catch (DaoException e) {
			System.out.println(e.getMessage());
		}
	}

	private String checkDuplicateCompany(Company company) {
		String email = company.getEmail();
		String name = company.getName();

		if (companyRepository.getByName(name) != null) {
			return "name";
		}
		if (companyRepository.getByEmail(email) != null) {
			return "email";
		}
		return "ok";
	}

	public void updateCompany(Company company) {
		try {
			Optional<Company> opt = companyRepository.findById(company.getId());
			if (opt.isEmpty()) {
				throw new DaoException("Update Failed - company not found");
			}
			Company companyDb = opt.get();
			if (!companyDb.getName().equals(company.getName())) {
				throw new DaoException("Can not change company name !!!");
			}
			// check if found other company with same email but different id
			Company dupCompany = companyRepository.getByEmail(company.getEmail());
			if (dupCompany != null && dupCompany.getId() != company.getId()) {
				throw new DaoException("Can not change company email - duplicate email found!!!");
			}
			companyDb.setEmail(company.getEmail());
			companyDb.setPassword(company.getPassword());

			System.out.println("Company updated Successfully");
		} catch (DaoException e) {
			System.out.println(e.getMessage());
		}
	}

	public void deleteCompany(int id) throws DaoException {
		// database foreign key restrictions on delete cascade will automatically delete
		// all coupons and all purchases
		// with permission from Eldar
		Optional<Company> temp = companyRepository.findById(id);
		if (temp.isEmpty()) {
			throw new DaoException("Delete Failed - company not found");
		}
		companyRepository.deleteById(id);
		System.out.println("Company deleted Successfully");
	}

	public List<Company> getAllCompanies() {
		return companyRepository.findAll();
	}

	public Company getOneCompany(int id) {
		Optional<Company> opt = companyRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		} else {
			return null;
		}		
	}

	public void addCustomer(Customer customer) {
		try {
			if (customerRepository.getByEmail(customer.getEmail()) != null) {
				throw new DaoException("Customer's email exists already!!!");
			}
			customerRepository.save(customer);
			System.out.println("Customer added successfuly.");
		} catch (DaoException e) {
			System.out.println(e.getMessage());
		}
	}

	public void updateCustomer(Customer customer) {
		try {
			Optional<Customer> opt = customerRepository.findById(customer.getId());
			if (opt.isEmpty()) {
				throw new DaoException("Update Failed - customer not found");
			}
			Customer customerDb = opt.get();
			// check if found other customer with same email but different id
			Customer dupEmailCustomer = customerRepository.getByEmail(customer.getEmail());
			if (dupEmailCustomer != null && dupEmailCustomer.getId() != customer.getId()) {
				throw new DaoException("Customer's email exists already!!!");
			}
			customerDb.setFirst_name(customer.getFirst_name());
			customerDb.setLast_name(customer.getLast_name());
			customerDb.setEmail(customer.getEmail());
			customerDb.setPassword(customer.getPassword());
			System.out.println("Customer updated successfuly.");
		} catch (DaoException e) {
			System.out.println(e.getMessage());
		}
	}

	public void deleteCustomer(int id) throws DaoException {
		// database foreign key restrictions on delete cascade will automatically delete
		// all purchases
		// with permission of Eldar
		Optional<Customer> temp = customerRepository.findById(id);
		if (temp.isEmpty()) {
			throw new DaoException("Delete Failed - Customer not found");
		}
		customerRepository.deleteById(id);
		System.out.println("Customer deleted successfuly.");
	}

	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}

	public Customer getOneCustomer(int id) {
		Optional<Customer> opt = customerRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		} else {
			return null;
		}
	}

	public boolean isLoggedIn() {
		return loggedIn;
	}

	public String getAdminDetails() {
			return ("ADMIN");
	}
}
