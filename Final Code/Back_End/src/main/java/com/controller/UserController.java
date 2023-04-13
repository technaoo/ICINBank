package com.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Service.UserService;
import com.bean.User;

@RestController
@RequestMapping("user")
@CrossOrigin
public class UserController {
	
	
	@Autowired
	UserService usr;
	
	
	@PostMapping(value="/check/",consumes=MediaType.APPLICATION_JSON_VALUE)
	public int checkUser(@RequestBody User user) {
		System.out.println("User=>"+user);
		return usr.checkUser(user);
	}
	
	@PostMapping(value="/block/{ID}/{state}",consumes=MediaType.APPLICATION_JSON_VALUE)
	public int BlockUser(@PathVariable("ID") int ID, @PathVariable("state") int state) {
		return usr.block_unblockUser(ID,state);
	}

	@PostMapping(value="/create",consumes=MediaType.APPLICATION_JSON_VALUE)
	public int createUser(@RequestBody User user) {
		try {
			
			System.out.println("User.telephoneNo_=>"+user.getTelephone_no());
		return usr.createUser(user);
		
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
		
	}
	
	@GetMapping(value="/detail/{id}",produces= MediaType.APPLICATION_JSON_VALUE)
	public User retrieveDetaills(@PathVariable("id")int id) {
		try {
			return usr.retrieveDetails(id);
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@PostMapping(value="/updatepass/{pass}/{id}",consumes=MediaType.APPLICATION_JSON_VALUE)
	public int updatepass(@PathVariable("pass") String pass, @PathVariable("id") int id) {
		try {
		return usr.changePassword(pass, id);

		
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
		
	}
	
	@PostMapping(value="/updateaddress/{id}",consumes=MediaType.APPLICATION_JSON_VALUE)
	public int updateaddress(@RequestBody User user,@PathVariable("id") int id ) {
		try {
		return usr.changeAddress(user,id);

		
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
		
	}
	
	@PostMapping(value="/update_telephone/{id}/{tel}",consumes=MediaType.APPLICATION_JSON_VALUE)
	public int update_telphone_no(@PathVariable("tel") Long tel,@PathVariable("id") int id ) {
		try {
		return usr.updateTelephone_no(id,tel);
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
		
	}
	
	@PostMapping(value="/update_mail/{id}/{mail}",consumes=MediaType.APPLICATION_JSON_VALUE)
	public int update_mail(@PathVariable("id") int id,@PathVariable("mail") String mail ) {
		try {
		return usr.updatemail(id,mail);
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
		
	}

	@PostMapping(value="/updatetype/{id}/{type}",consumes=MediaType.APPLICATION_JSON_VALUE)
	public String updateAcc_Type(@PathVariable("type") int type,@PathVariable("id") int id ) {
		try {
		return usr.AddAccount_Type(type,id);

		
		}catch(Exception e) {
			e.printStackTrace();
			return "Error bitch!";
		}
		
	}
	
	@PostMapping(value="/transfer/{id}/{acc_type}/{amount}/{name}/{accno}/{upi}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public int transfer(@PathVariable("id") int id,@PathVariable("acc_type") int acc_type, @PathVariable("amount") Long amount,
			@PathVariable("name") String name, @PathVariable("accno") Long accno , @PathVariable("upi") String UPI ) {
		return usr.TansferFundsBetweenAccounts(id, amount, name, accno,acc_type,UPI);
			
		
	}

	@PostMapping(value="/transferbetweenpri_saving/{acc_id}/{amount}/{dest}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public int transferinternal(@PathVariable("acc_id") int id, @PathVariable("amount") long amount, @PathVariable("dest") int dest) {
		System.out.println("acc_id "+id+" amount "+amount+" dest "+dest);
		return usr.TransferFundsBetweenPri_Save(id, amount, dest);
	
	}
	
	@PostMapping(value="/withdraw/{acc_id}/{amount}/{dest}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public int Withdraw(@PathVariable("acc_id")int id, @PathVariable("amount") long amount, @PathVariable("dest") int dest) {
		return usr.WithdrawFunds(id, amount, dest);
	}
	
	@PostMapping(value="/balance/{acc_id}/{acc_type}",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
	public long balance(@PathVariable("acc_id")int id, @PathVariable("acc_type")int acc_type) {
		return usr.showBalance(id, acc_type);
	}
	
	@PostMapping(value="/setCheque/{id}/{cheqid}")
	public int setCheque(@PathVariable("id") int id, @PathVariable("cheqid") int cheq) {
		return usr.setCheque(id, cheq);
	}
	
	@PostMapping(value="/deposit/{id}/{amount}/{acc}/{acc_name}/{acc_no}/{upi}",consumes=MediaType.APPLICATION_JSON_VALUE)
	public int deposit(@PathVariable("id") int id, @PathVariable("amount") Long amount, @PathVariable("acc") int acc,
			@PathVariable("acc_name") String name, @PathVariable("acc_no") Long acc_no, @PathVariable("upi") String upi) {
		return usr.depositfunds(id, amount, acc,name, upi, acc_no);
	}
	
	
	

	
	

	
	
	
	
	
	
	

}
