package com.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bean.Cheques;
import com.bean.User;
import com.repository.Cheque_Repository;

@Service
public class ChequeService {

	
	@Autowired
	Cheque_Repository chr;
	
	
	public int RequestCheque(int cheque) {
	try {
		Cheques che = CheckAcc_returndetail(cheque);
		
		Optional<Cheques> op = chr.findById(che.getCheque_id());
		if(op.isPresent()) {
			Cheques cheq = op.get();
			if(cheq.getRequested_Cheques()>=1) {
				return 2;
			}else if(cheq.getRequested_Cheques()==0) {
				cheq.setRequested_Cheques(1);
				chr.save(cheq);
				return 1;
			}
		}else {
			return 0;
		}
	}catch(Exception e) {
		e.printStackTrace();
		return 0;
	}
	return 0;
		
		
		
	}
	
	public Cheques CheckAcc_returndetail(int id) {
		try {
			
			List<Cheques> list  = chr.findAll();
			boolean b = true;
			Iterator<Cheques> it= list.iterator();
				
			while(it.hasNext()) {
				Cheques cheq = it.next();
				if(cheq.getCustomer_repoID()==id) {
					return cheq;
				}
			}return null;
			
			
			
		}catch(Exception e ) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	public int RegisterAcc(int customerID) {
//		System.out.println("the thing"+cheque);
		try {
			
		    if(customerID==0) {
		    	return 0;
		    }

				
			Cheques cheque = new Cheques();
			
				Random random = new Random();
				
			    int a = random.nextInt(50);
			    System.out.println("Check 1");
			    List<Cheques> list= chr.findAll();
			    Iterator<Cheques> it = list.iterator();
			    Boolean b = true;
			    if(list.size()!=0) { 
			    while(b) {
			    
			    while(it.hasNext()) {
			    	Cheques ex = it.next();
			    	if(a==0) {
			    		a++;
			    	}
			    	if(ex.getCheque_id()==a) {
			    		a++;
			    	}else {
			    		b=false;
			    	}
			    	
			    	if(ex.getCustomer_repoID()==customerID) {
			    		System.out.println("Check 4");
			    		return 0;
			    	}	
			    }
			    
			    }
			    System.out.println("Check 2");
			    //Boolean v = true;
//			    System.out.println("Check 3");
//			    while(it.hasNext()) {
//			    	Cheques ex = it.next();
//			    	System.out.println("Customer ID from repos: "+ ex.getCustomer_repoID());
//			    	System.out.println("Customer ID hardcoded: "+customerID);
//			    	if(ex.getCustomer_repoID()==customerID) {
//			    		System.out.println("Check 4");
//			    		return false;
//			    	}else {
//			    		System.out.println("Check 5");
//			    		return true;
//			    	}
//			    }
//			    System.out.println("Check 6");
//			    }
			    }
			    System.out.println("Check 7");
			    cheque.setCheque_id(a);
	            cheque.setCustomer_repoID(customerID);
			    cheque.setDeclined_Cheques(0);
				cheque.setIssued_Cheques(1);
				cheque.setRequested_Cheques(0);
				chr.save(cheque);
				return a;
			    
			
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		
		
	}
	 
	
	public int Approve_decline_Cheque(int cheque_id, int state) {
		try {
			 
			Optional<Cheques> op = chr.findById(cheque_id);
			if(op.isPresent()) {
				Cheques cheq = op.get();
				if(cheq.getRequested_Cheques()!=1) {
					return 2;
				}else {
					if(state==1) {
					cheq.setIssued_Cheques(cheq.getIssued_Cheques()+1);
					cheq.setRequested_Cheques(0);
					chr.save(cheq);
					
					return 1;
					}else if(state==2) {
					cheq.setDeclined_Cheques(cheq.getDeclined_Cheques()+1);
					cheq.setRequested_Cheques(0);
					chr.save(cheq);
                       return 1;
					}else {
						return 0;
					}
				}
			}else {
				return 0;
			}
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	
	
	
	
}
