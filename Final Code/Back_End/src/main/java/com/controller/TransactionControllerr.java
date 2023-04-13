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

import com.Service.TransactionService;
import com.bean.Transaction;

@RestController
@RequestMapping("transaction")
@CrossOrigin
public class TransactionControllerr {
	
	@Autowired
	TransactionService trs;
	
	@PostMapping(value="/add",consumes=MediaType.APPLICATION_JSON_VALUE)
	public int addTransaction(@RequestBody Transaction tran) {
		return trs.addTransaction(tran);
	}
	
	@GetMapping(value="/retrieveTransactions/{id}")
	public List<Transaction> retrieve_transactions(@PathVariable("id") int id) {
		return trs.retrieve_acc_transactions(id);
	}

}
