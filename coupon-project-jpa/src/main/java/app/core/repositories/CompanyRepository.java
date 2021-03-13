package app.core.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import app.core.entities.Company;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
	
	Company getByName(String name);
	
	Company getByEmail(String email);

}