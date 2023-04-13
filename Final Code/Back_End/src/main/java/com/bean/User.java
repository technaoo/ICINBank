package com.bean;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {
	
	private String forename;
	private String surname;
	private String password;
	@Id

	private int customer_repoid;

	private int account_type;
	private String email;
    private Long telephone_no;
    private String address_1;
	private String address_2;
    private String address_3;
    private String address_4;
    private Date dob;
    private int cheque_id;
    private Long balance_1;
    private Long balance_2;
    private Long pincode;
    private String state;
    private String city;
    
    
    
    
    public int getCheque_id() {
		return cheque_id;
	}
	public void setCheque_id(int cheque_id) {
		this.cheque_id = cheque_id;
	}
	public Long getPincode() {
		return pincode;
	}
	public void setPincode(Long pincode) {
		this.pincode = pincode;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getForename() {
		return forename;
	}
	public void setForename(String forename) {
		this.forename = forename;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	private int acc_state;  // 1=>'active' 2=>'blocked'
    public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

    
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getAcc_state() {
		return acc_state;
	}
	public void setAcc_state(int acc_state) {
		this.acc_state = acc_state;
	}

	@Override
	public String toString() {
		return "User [forename=" + forename + ", surname=" + surname + ", password=" + password + ", customer_repoid="
				+ customer_repoid + ", account_type=" + account_type + ", email=" + email + ", telephone_no="
				+ telephone_no + ", address_1=" + address_1 + ", address_2=" + address_2 + ", address_3=" + address_3
				+ ", address_4=" + address_4 + ", dob=" + dob + ", cheque_id=" + cheque_id + ", balance_1=" + balance_1
				+ ", balance_2=" + balance_2 + ", pincode=" + pincode + ", state=" + state + ", city=" + city
				+ ", acc_state=" + acc_state + "]";
	}
	public Long getBalance_1() {
		return balance_1;
	}
	public void setBalance_1(Long balance_1) {
		this.balance_1 = balance_1;
	}
	public Long getBalance_2() {
		return balance_2;
	}
	public void setBalance_2(Long balance_2) {
		this.balance_2 = balance_2;
	}
	
	public int getCustomer_repoid() {
		return customer_repoid;
	}
	public void setCustomer_repoid(int customer_repoid) {
		this.customer_repoid = customer_repoid;
	}
	public int getAccount_type() {
		return account_type;
	}
	public void setAccount_type(int account_type) {
		this.account_type = account_type;
	}
	public Long getTelephone_no() {
		return telephone_no;
	}
	public void setTelephone_no(Long telephone_no) {
		this.telephone_no = telephone_no;
	}
	public String getAddress_1() {
		return address_1;
	}
	public void setAddress_1(String address_1) {
		this.address_1 = address_1;
	}
	public String getAddress_2() {
		return address_2;
	}
	public void setAddress_2(String address_2) {
		this.address_2 = address_2;
	}
	public String getAddress_3() {
		return address_3;
	}
	public void setAddress_3(String address_3) {
		this.address_3 = address_3;
	}
	public String getAddress_4() {
		return address_4;
	}
	public void setAddress_4(String address_4) {
		this.address_4 = address_4;
	}
	
	public User(String forename, String surname, String password, int customer_repoid, int account_type, String email,
			Long telephone_no, String address_1, String address_2, String address_3, String address_4, Date dob,
			int cheque_id, Long balance_1, Long balance_2, Long pincode, String state, String city, int acc_state) {
		super();
		this.forename = forename;
		this.surname = surname;
		this.password = password;
		this.customer_repoid = customer_repoid;
		this.account_type = account_type;
		this.email = email;
		this.telephone_no = telephone_no;
		this.address_1 = address_1;
		this.address_2 = address_2;
		this.address_3 = address_3;
		this.address_4 = address_4;
		this.dob = dob;
		this.cheque_id = cheque_id;
		this.balance_1 = balance_1;
		this.balance_2 = balance_2;
		this.pincode = pincode;
		this.state = state;
		this.city = city;
		this.acc_state = acc_state;
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    
    
	

}
