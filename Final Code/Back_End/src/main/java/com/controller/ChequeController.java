package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Service.ChequeService;
import com.bean.Cheques;

@RestController
@RequestMapping("cheques")
@CrossOrigin
public class ChequeController {
	
	
	@Autowired
	ChequeService cheqs;
	
	
	@PostMapping(value="/request/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
	public int RequestCheques(@PathVariable("id") int che) {
		return cheqs.RequestCheque(che);
	}
	
	@PostMapping(value="/register/{id}",consumes=MediaType.APPLICATION_JSON_VALUE)
	public int RegisterCheques(@PathVariable("id") int che) {
		return cheqs.RegisterAcc(che);
	}
	
	@GetMapping(value="/check/{id}",produces= MediaType.APPLICATION_JSON_VALUE)
	public Cheques registerCheques(@PathVariable("id") int id) {
		return cheqs.CheckAcc_returndetail(id);
	}
	
	@PostMapping(value="/issue/{id}/{state}",consumes = MediaType.APPLICATION_JSON_VALUE)
	public int IssueCheques(@PathVariable("id") int che, @PathVariable("state") int state) {
		return cheqs.Approve_decline_Cheque(che,state);
	}

	
	

}
