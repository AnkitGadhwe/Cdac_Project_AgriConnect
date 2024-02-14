package com.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.demo.Service.ConsumerService;

@RestController
public class REGISTRATION_CONTROLLER {
	
	@Autowired
	ConsumerService cService;

	@PostMapping("/upload")
    public ResponseEntity<Boolean> uploadData(@RequestParam String Firstname,@RequestParam String Lastname,@RequestParam String EMailid,@RequestParam String Address, @RequestParam String Pincode, @RequestParam String State, @RequestParam String Gender,@RequestParam String WhatsApp_Number,@RequestParam String UserPassword,@RequestParam MultipartFile profileImage) {
       
		boolean flag = cService.uploadData(  Firstname,  Lastname, EMailid, Address,   Pincode,   State,   Gender,  WhatsApp_Number,  UserPassword,profileImage);
		if(flag) {
			return ResponseEntity.ok(flag);
		}
		else {
			return ResponseEntity.ok(false);
		} 
		
    }
	
	
}	
