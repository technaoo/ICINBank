package com.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Cheques {
	
	@Id
	private int cheque_id;
	private int Customer_repoID;
	private int Issued_Cheques;
	private int Requested_Cheques;
	private int Declined_Cheques;
	
	
	
	public int getCheque_id() {
		return cheque_id;
	}
	public void setCheque_id(int cheque_id) {
		this.cheque_id = cheque_id;
	}
	public int getCustomer_repoID() {
		return Customer_repoID;
	}
	public void setCustomer_repoID(int customer_repoID) {
		Customer_repoID = customer_repoID;
	}
	public int getIssued_Cheques() {
		return Issued_Cheques;
	}
	public void setIssued_Cheques(int issued_Cheques) {
		Issued_Cheques = issued_Cheques;
	}
	public int getRequested_Cheques() {
		return Requested_Cheques;
	}
	public void setRequested_Cheques(int requested_Cheques) {
		Requested_Cheques = requested_Cheques;
	}
	public int getDeclined_Cheques() {
		return Declined_Cheques;
	}
	public void setDeclined_Cheques(int declined_Cheques) {
		Declined_Cheques = declined_Cheques;
	}
	@Override
	public String toString() {
		return "Cheques [cheque_id=" + cheque_id + ", Customer_repoID=" + Customer_repoID + ", Issued_Cheques="
				+ Issued_Cheques + ", Requested_Cheques=" + Requested_Cheques + ", Declined_Cheques=" + Declined_Cheques
				+ "]";
	}
	public Cheques() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Cheques(int cheque_id, int customer_repoID, int issued_Cheques, int requested_Cheques,
			int declined_Cheques) {
		super();
		this.cheque_id = cheque_id;
		Customer_repoID = customer_repoID;
		Issued_Cheques = issued_Cheques;
		Requested_Cheques = requested_Cheques;
		Declined_Cheques = declined_Cheques;
	}
	
	
	

}
