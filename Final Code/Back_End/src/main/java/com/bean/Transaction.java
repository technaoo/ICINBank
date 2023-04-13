package com.bean;

import java.sql.Date;
import java.sql.Time;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Transaction {
	
	@Id
	private String transaction_id;
	public int getAcc_dest() {
		return acc_dest;
	}
	public void setAcc_dest(int acc_dest) {
		this.acc_dest = acc_dest;
	}
	private int customer_repoid;
	private Long amount;
	private int type_of_transaction;
	private int generation_method;
	private String upi_address;
	private String card_holder;
	private Long card_l6_digits;
	private String date;
	private String time;
	private int acc_dest;
	
	public Long getAmount() {
		return amount;
	}
	public void setAmount(Long amount) {
		this.amount = amount;
	}

	public Transaction() {
		super();
	}
	public String getTransaction_id() {
		return transaction_id;
	}
	public void setTransaction_id(String transaction_id) {
		this.transaction_id = transaction_id;
	}
	public int getCustomer_repoid() {
		return customer_repoid;
	}
	public void setCustomer_repoid(int customer_repoid) {
		this.customer_repoid = customer_repoid;
	}
	public int getType_of_transaction() {
		return type_of_transaction;
	}
	public void setType_of_transaction(int type_of_transaction) {
		this.type_of_transaction = type_of_transaction;
	}
	public int getGeneration_method() {
		return generation_method;
	}
	public void setGeneration_method(int generation_method) {
		this.generation_method = generation_method;
	}
	public String getUpi_address() {
		return upi_address;
	}
	public Transaction(String transaction_id, int customer_repoid, Long amount, int type_of_transaction,
			int generation_method, String upi_address, String card_holder, Long card_l6_digits, String date,
			String time, int acc_dest) {
		super();
		this.transaction_id = transaction_id;
		this.customer_repoid = customer_repoid;
		this.amount = amount;
		this.type_of_transaction = type_of_transaction;
		this.generation_method = generation_method;
		this.upi_address = upi_address;
		this.card_holder = card_holder;
		this.card_l6_digits = card_l6_digits;
		this.date = date;
		this.time = time;
		this.acc_dest = acc_dest;
	}
	public void setUpi_address(String upi_address) {
		this.upi_address = upi_address;
	}
	public String getCard_holder() {
		return card_holder;
	}
	public void setCard_holder(String card_holder) {
		this.card_holder = card_holder;
	}
	public Long getCard_l6_digits() {
		return card_l6_digits;
	}
	public void setCard_l6_digits(Long card_l6_digits) {
		this.card_l6_digits = card_l6_digits;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	@Override
	public String toString() {
		return "Transaction [transaction_id=" + transaction_id + ", customer_repoid=" + customer_repoid + ", amount="
				+ amount + ", type_of_transaction=" + type_of_transaction + ", generation_method=" + generation_method
				+ ", upi_address=" + upi_address + ", card_holder=" + card_holder + ", card_l6_digits=" + card_l6_digits
				+ ", date=" + date + ", time=" + time + ", acc_dest=" + acc_dest + "]";
	}
	
	
	

}
