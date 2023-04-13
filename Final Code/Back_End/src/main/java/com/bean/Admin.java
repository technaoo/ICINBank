package com.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Admin {

	
	@Id
	private int admin_id;
	private String forename;
	private String surname;
	private String admin_password;
	private Long telephone_no;
	private String email;
	public int getAdmin_id() {
		return admin_id;
	}
	public void setAdmin_id(int admin_id) {
		this.admin_id = admin_id;
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
	public String getAdmin_password() {
		return admin_password;
	}
	public void setAdmin_password(String admin_password) {
		this.admin_password = admin_password;
	}
	public Long getTelephone_no() {
		return telephone_no;
	}
	public void setTelephone_no(Long telephone_no) {
		this.telephone_no = telephone_no;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public String toString() {
		return "Admin [admin_id=" + admin_id + ", forename=" + forename + ", surname=" + surname + ", admin_password="
				+ admin_password + ", telephone_no=" + telephone_no + ", email=" + email + "]";
	}
	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
}