package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Service.AdminService;
import com.bean.Admin;
import com.bean.Cheques;

@RestController
@RequestMapping("admin")
@CrossOrigin
public class AdminController {
	
	@Autowired
	AdminService ads;
	
	@GetMapping(value="/pendingrequests",produces=MediaType.APPLICATION_JSON_VALUE)
    public List<Cheques> pendingRequests() {
    	return ads.pendingChequeRequests();
    }
	
	@PostMapping(value="/check/",consumes =MediaType.APPLICATION_JSON_VALUE)
    public int CheckAdmin(@RequestBody Admin ad){
		System.out.println("admin=>"+ad);
		return ads.Check(ad);
	}
	
	@PostMapping(value="/create/{fn}/{sn}/{pass}/{tel}/{mail}",consumes =MediaType.APPLICATION_JSON_VALUE)
    public int CheckAdmin(@PathVariable("fn") String fn,@PathVariable("sn") String sn,
    		@PathVariable("pass") String pass,@PathVariable("tel") Long tel,@PathVariable("mail") String mail){
		System.out.println(fn);
		System.out.println(sn);
		System.out.println(pass);
		System.out.println(tel);
		System.out.println(mail);
		
		return ads.createAdmin(fn, sn, tel, pass, mail);
	}
	
	
	@PostMapping(value="/create_init/",consumes =MediaType.APPLICATION_JSON_VALUE)
    public boolean createAdmin(){
		
		return ads.create_init_Admin();
	}


	

	
	
	
	
	
}
