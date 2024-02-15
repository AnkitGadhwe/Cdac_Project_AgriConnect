package com.demo.Dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.demo.Model.Consumer;


@Repository
public class ProfileDaoImpl implements ProfileDao{
	
	@Autowired
	private JdbcTemplate jdbctemplate;

	@SuppressWarnings("deprecation")
	@Override
	public Consumer getConsumer(String userid) {
	    String query = "SELECT * FROM consumer WHERE userid = ?";

	    try {
	        return jdbctemplate.queryForObject(query, new Object[]{userid}, (rs, rowNum) -> {
	            Consumer consumer = new Consumer();
	            consumer.setUSERID(rs.getString("USERID"));
	            consumer.setFirstname(rs.getString("Firstname"));
	            consumer.setLastname(rs.getString("Lastname"));
	            consumer.setEmailId(rs.getString("EmailId"));
	            consumer.setAddress(rs.getString("Address"));
	            consumer.setPincode(rs.getString("Pincode"));
	            consumer.setState(rs.getString("State"));
	            consumer.setGender(rs.getString("Gender"));
	            consumer.setWhatsApp_Number(rs.getString("WhatsApp_Number"));
	            consumer.setUser_password(rs.getString("User_password"));
	            
	            
	            return consumer;
	        });
	    } catch (EmptyResultDataAccessException ex) {
	        // Handle the case where no consumer with the given userid is found
	        return null; // Or throw a custom exception
	    }

	}

}
