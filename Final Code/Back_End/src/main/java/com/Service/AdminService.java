package com.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bean.Admin;
import com.bean.Cheques;
import com.bean.User;
import com.repository.Admin_Interface;
import com.repository.Cheque_Repository;



@Service
public class AdminService {
	
	@Autowired
	Admin_Interface adint;
	
	@Autowired
	Cheque_Repository chr;
	
    public List<Cheques> pendingChequeRequests(){
        List<Cheques> AllCheques = chr.findAll();
        List<Cheques> pendingCheques = new ArrayList<Cheques>();
        boolean check = false;
        Iterator<Cheques> it = AllCheques.iterator();
        if(AllCheques!=null) {
        while(it.hasNext()) {
        	Cheques cheq = it.next();
        	if(cheq.getRequested_Cheques()!=0&& cheq.getRequested_Cheques()>0) {
        		pendingCheques.add(cheq);
        		check=true;
        	}
        }
        }
        if(check==false) {
        	return null;
        }
        
        return pendingCheques;
        
    }
    
    public int numberofrequests(){
    	try {
            List<Cheques> AllCheques = chr.findAll();
            int pendingCheques=0;
            
            Iterator<Cheques> it = AllCheques.iterator();
            if(AllCheques!=null) {
            while(it.hasNext()) {
            	Cheques cheq = it.next();
            	if(cheq.getRequested_Cheques()!=0&& cheq.getRequested_Cheques()>0) {
            		pendingCheques++;
            	}
            }
            }
            
            return pendingCheques;
    		
    	}catch(Exception e) {
    		e.printStackTrace();
    		return 0;
    	}
    	
    }
    
    
    public int Check(Admin admin) {
    	Optional<Admin> op = adint.findById(admin.getAdmin_id());
    	if(op.isPresent()) {
    		Admin ad = op.get();
    		if(ad.getAdmin_password().equals(admin.getAdmin_password())) {
    			return 1;
    		}else {
    			return 2;
    		}
    	}else {
    		return 0;
    	}
    }
    
    public int createAdmin(String fn, String sn,Long tel, String pass,String mail) {
		System.out.println(fn);
		System.out.println(sn);
		System.out.println(pass);
		System.out.println(tel);
		System.out.println(mail);

		try {
			Random random = new Random();
			
		    int a = random.nextInt(50);
		    
		    List<Admin> list= adint.findAll();
		    Iterator<Admin> it = list.iterator();
		    Boolean b = true;
		    if(list.size()!=0) {
		    while(b) {
		    
		    while(it.hasNext()) {
		    	Admin ex = it.next();
		    	if(a==0) {
		    		a++;
		    	}
		    	if(ex.getAdmin_id()==a) {
		    		a++;
		    	}else {
		    		b=false;
		    	}
		    }
		    
		    }
		    }
		    Admin ad= new Admin();
		    ad.setAdmin_id(a);
		    ad.setForename(fn);
		    ad.setSurname(sn);
		    ad.setTelephone_no(tel);
		    ad.setAdmin_password(pass);
		    ad.setEmail(mail);;
			adint.save(ad);
			return a;
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	

    	
    	
    }
    
    
    public Boolean create_init_Admin() {
    	
    	try {
    	Admin ad = new Admin();
    	ad.setAdmin_id(1);
    	ad.setAdmin_password("randomPassword");
    	ad.setEmail("admin_ICIN@gmail.com");
    	ad.setForename("Mr.Admin");
    	ad.setSurname("of_ICIN_Bank");
    	ad.setTelephone_no(Long.parseLong("9987658365"));
    	
    	adint.save(ad);
    	return true;
    	}catch(Exception e) {
    		e.printStackTrace();
    		return false;
    	}
    }
    
//    public List<Cheques> pe_rjrequests(List<Cheques> list){
//    	
//    	//yellow broadie
//    	
//    }
    
    
    
    
    
    
    

}