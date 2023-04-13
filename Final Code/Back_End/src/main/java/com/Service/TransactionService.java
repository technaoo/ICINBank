package com.Service;


import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bean.Transaction;
import com.repository.Transaction_Repository;

@Service
public class TransactionService {
	
	@Autowired
	Transaction_Repository tr;
	
	public int addTransaction(Transaction tran) {
		try {
			
			
			
			int year = LocalDate.now().getYear();
			int date = LocalDate.now().getDayOfMonth();
			int month = LocalDate.now().getMonthValue();
			String time = java.time.LocalDateTime.now().toString().substring(11, 19);
			int hour =  Integer.parseInt(time.substring(0, 2));
			int min =  Integer.parseInt(time.substring(3, 5));
			int sec =  Integer.parseInt(time.substring(6, 8));
			
			Long transaction_couple = (long) year*date*month*hour*min*sec;
			String transaction_coup = transaction_couple.toString();
			tran.setTransaction_id(tran.getTransaction_id()+transaction_coup);
			
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			Date d1 = new Date();
			tran.setDate(formatter.format(d1));
			tran.setTime(time);
			
			tr.save(tran);
            return 1;
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	public List<Transaction>  retrieve_acc_transactions(int id){
		
		try {
			List<Transaction> Transaction_list = tr.findAll();
			Iterator<Transaction> it = Transaction_list.iterator();
			List<Transaction> list_of_id = new ArrayList<Transaction>();
			while(it.hasNext()) {
				Transaction tran = it.next();
				if(tran.getCustomer_repoid()==id) {
					list_of_id.add(tran);
				}
			}
			return list_of_id;
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	

}
