package com.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bean.Transaction;
import com.bean.User;
import com.repository.User_Repository;



@Service
public class UserService {

	@Autowired
	User_Repository usr;
	
	@Autowired
	TransactionService tsr;
	
	
	
	
	public int checkUser(User us) {
		Optional<User> op = usr.findById(us.getCustomer_repoid());
		System.out.println("pass=>"+us.getPassword());
		if(op.isPresent()) {
		    User user = op.get();
		    
		    System.out.println("password=>"+user.getPassword());
		    if(user.getPassword().equals(us.getPassword())||user.getPassword()==us.getPassword()) {
		    	if(user.getAcc_state()==0) {
			    	return 1;
		    	}else {
		    		return 3;
		    	}
		    }else {
		    	return 2;
		    }
			
		}else {
			return 0;
		}
	}
	
	public int block_unblockUser(int id,int b_unb) {
		Optional<User> op = usr.findById(id);
		if(op.isPresent()) {
			User user = op.get();

			if(b_unb==1) {
			if(user.getAcc_state()==1) {
				return 2;
			}else {
				user.setAcc_state(1);
				usr.save(user);
				return 1;
			}
		}else {
			if(user.getAcc_state()==0) {
				return 2;
			}else {
				user.setAcc_state(0);
				usr.save(user);
				return 1;

		}
		}
		}else {
			return 0;
		}
	}
	
	public int createUser(User user) {
	 
		try {
			Random random = new Random();
			
		    int a = random.nextInt(50);
		    
		    List<User> list= usr.findAll();
		    Iterator<User> it = list.iterator();
		    Boolean b = true;
		    if(list.size()!=0) {
		    while(b) {
		    
		    while(it.hasNext()) {
		    	User ex = it.next();
		    	if(a==0) {
		    		a++;
		    	}
		    	if(ex.getCustomer_repoid()==a) {
		    		a++;
		    	}else {
		    		b=false;
		    	}
		    }
		    
		    }
		    }
		    
		    LocalDate Date = java.time.LocalDate.now();
		    String end_date = Date.toString();
		    String start_date = user.getDob().toString();
		    System.out.println("end=>"+end_date);
		    System.out.println("start=>"+start_date);
		    String age = findDifference(start_date, end_date);
		    System.out.println("diference=>"+age);
		    if(Integer.parseInt(age)>=18) {
			    user.setCustomer_repoid(a);
				usr.save(user);
				return a;

		    }else {
		    	return 2;
		    }
		    
		    
		    
		    
		    
		    
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	
	}
	
	public User retrieveDetails(int id) {
		Optional<User> op = usr.findById(id);
		if(op.isPresent()) {
			return op.get();
		}else {
			return null;
		}
	}
	
	public int changePassword(String pass,int id) {
		Optional<User> op = usr.findById(id);
		if(op.isPresent()) {
			User user = op.get();
			user.setPassword(pass);
			usr.saveAndFlush(user);
			return 1;
		}else {
			return 2;
		}

	}
	
	public int updateTelephone_no(int id, Long tel) {
		try {
			Optional<User> op = usr.findById(id);
			if(op.isPresent()) {
				User user = op.get();
				user.setTelephone_no(tel);
				usr.save(user);
				return 1;
			}else {
				return 2;
			}
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	public int updatemail(int id, String mail) {
		
		try {
			Optional<User> op = usr.findById(id);
			if(op.isPresent()) {
				User user = op.get();
				user.setEmail(mail);
				usr.save(user);
				return 1;
			}else {
				return 2;
			}
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}

	}
	
	public int changeAddress(User usrr,int id) {
		System.out.println("Address1 "+usrr.getAddress_1());
		System.out.println("Address2 "+usrr.getAddress_2());
		System.out.println("Address3 "+usrr.getAddress_3());
		System.out.println("Address4 "+usrr.getAddress_4());
		System.out.println("Customer_REPOID"+usrr.getCustomer_repoid());

		Optional<User> op = usr.findById(id);
		if(op.isPresent()) {
			User user = op.get();
			user.setAddress_1(usrr.getAddress_1());
			user.setAddress_2(usrr.getAddress_2());
			user.setAddress_3(usrr.getAddress_3());
			user.setAddress_4(usrr.getAddress_4());
			user.setState(usrr.getState());
			user.setCity(usrr.getCity());
			user.setPincode(usrr.getPincode());
			usr.saveAndFlush(user);
			return 1;
		}else {
			return 0;
		}

	}
	
	public String AddAccount_Type(int acc_type,int id) {
		Optional<User> op = usr.findById(id);
		if(op.isPresent()) {
			
			User user = op.get();
			user.setAccount_type(acc_type);
			usr.saveAndFlush(user);
			return "Done Broadie";
		}else {
			return "Failed";
		}

	}
	
	public int TansferFundsBetweenAccounts(int id,long amount, String Receipient_Name, Long Account_No,int acc_type, String UPI) {
		
		String acc_no = Account_No.toString();
		
		
		Optional<User> op = usr.findById(id);
		if(op.isPresent()) {
			System.out.println("check");
		   User user = op.get();
		   
			   
				if(acc_type==1) {
					if(user.getBalance_1()==null) {
						return 3;
					}
					
					if(  user.getBalance_1()!=null ||user.getBalance_1()>=amount  ) {
					   if(acc_no.length()>=8&&acc_no.length()<=17) {
						   user.setBalance_1((user.getBalance_1()-amount));
						   usr.save(user);
						   
						   Transaction tran = new Transaction();
						   tran.setAcc_dest(acc_type);
						   tran.setAmount(amount);
						   tran.setCard_holder(Receipient_Name);
						   tran.setCard_l6_digits(Account_No);
						   tran.setCustomer_repoid(id);
						   tran.setGeneration_method(2);
						   tran.setType_of_transaction(2);
						   Integer in = id;
			               tran.setTransaction_id("DE_CR"+in.toString());
			               if(tsr.addTransaction(tran)==1) {
			            	   return 1;
			               }else {
			            	   return 0;
			               }
						   
						   
						  
					   }else {
						   return 2;
					   }
					}else {
						return 3;
					}

				}else if (acc_type==2) {
					
					if(user.getBalance_2()==null) {
						return 3;
					}
					
					if(user.getBalance_2()>=amount || user.getBalance_2()==null) {
					   if(acc_no.length()>=8&&acc_no.length()<=17) {
						   user.setBalance_2((user.getBalance_2()-amount));
						   usr.save(user);
					       
						   Transaction tran = new Transaction();
						   tran.setAcc_dest(acc_type);
						   tran.setAmount(amount);
						   tran.setCard_holder(Receipient_Name);
						   tran.setCard_l6_digits(Account_No);
						   tran.setCustomer_repoid(id);
						   tran.setGeneration_method(2);
						   tran.setType_of_transaction(2);
						   Integer in = id;
			               tran.setTransaction_id("DE_CR"+in.toString());
			               if(tsr.addTransaction(tran)==1) {
			            	   return 1;
			               }else {
			            	   return 0;
			               }

					   }else {
						   return 2;
					   }
					}else {
						return 3;
					}
				}else {
					if(user.getBalance_2()==null) {
						return 3;
					}
					if( user.getBalance_2()!=null|| user.getBalance_2()>=amount) {
						   if(acc_no.length()>=8&&acc_no.length()<=17) {
							   user.setBalance_2((user.getBalance_2()-amount));
							   usr.save(user);
						       
							   Transaction tran = new Transaction();
							   tran.setAcc_dest(acc_type);
							   tran.setAmount(amount);
							   tran.setCard_holder(Receipient_Name);
							   tran.setCard_l6_digits(Account_No);
							   tran.setCustomer_repoid(id);
							   tran.setGeneration_method(2);
							   tran.setType_of_transaction(2);
							   Integer in = id;
				               tran.setTransaction_id("DE_CR"+in.toString());
				               if(tsr.addTransaction(tran)==1) {
				            	   return 1;
				               }else {
				            	   return 0;
				               }

						   }else {
							   return 2;
						   }
						}else {
							return 3;
						}

				}

			   
			   
		   
		   
		}else {
			return 4;
		}
		
		
		
	}
	
	public int TransferFundsBetweenPri_Save(int id,long amount,int dest){
		Optional<User> op = usr.findById(id);
		if(op.isPresent()) {
			User user = op.get();
			
			if(user.getAccount_type()==2) {
				if(dest ==2) {
					if( user.getBalance_1()>=amount) {
						user.setBalance_1(user.getBalance_1()-amount);
						user.setBalance_2(user.getBalance_2()+amount);
						usr.save(user);
						return 1;
					}
				}else if(dest ==1) {
					if(user.getBalance_2()>=amount) {
						user.setBalance_1(user.getBalance_1()+amount);
						user.setBalance_2(user.getBalance_2()-amount);
						usr.save(user);
						return 1;
					}
				}
			}
		}else {
			return 0;
		}
return 0;
	}
	
	public int WithdrawFunds(int id, long amount, int dest) {
		Optional<User> op = usr.findById(id);
		if(op.isPresent()) {
			User user = op.get();
			if(dest ==1) {
				user.setBalance_1(user.getBalance_1()-amount);
				usr.save(user);
				return 1;
			}else if(dest ==2) {
				user.setBalance_2(user.getBalance_2()-amount);
				usr.save(user);
				return 1;
			}else {
				return 0;
			}
		}
return 0;
	}
	
	public long showBalance(int id,int acc_type) {
		Optional<User> op = usr.findById(id);
		if(op.isPresent()) {
			User user = op.get();
			if(acc_type==1) {
			return user.getBalance_1();
			}else if (acc_type==2) {
				if(user.getAccount_type()==2) {
					return user.getBalance_2();
				}else {
					return 2;
				}
			}else {
				return 0;
			}
		}else {
			return 0;
			
		}
		
	}

	public String  findDifference(String start_date,String end_date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date d1 = sdf.parse(start_date);
			Date d2 = sdf.parse(end_date);
			
			Long difference_In_Time =d2.getTime() - d1.getTime();
			Long difference_In_Years= (difference_In_Time/(1000l*60*60*24*365));
			return difference_In_Years.toString();
			
			
		}catch(ParseException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public int setCheque(int id,int Cheque) {
		try {
			Optional<User> op = usr.findById(id);
			if(op.isPresent()) {
			User cheq = op.get();
				cheq.setCheque_id(Cheque);
				usr.save(cheq);
				return 1;
				
			}else {
				return 2;
			}
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	public int depositfunds(int id,long amount,int credit_acc, String Receipient_name, String UPI, Long Account_No) {
		try {
			Integer in = id;
			System.out.println("name=>"+Receipient_name);
			Optional<User> op = usr.findById(id);
			if(op.isPresent()) {
				User user = op.get();
				if(user.getBalance_1()==null) {
					user.setBalance_1((long) 0);
				}
				if(user.getBalance_2()==null) {
					user.setBalance_2((long)0);
				}
			    if(user.getAccount_type()==2) {
			    	
						     
			    	if(credit_acc==1) {
			    		user.setBalance_1(amount+user.getBalance_1());
			    		usr.save(user);
			    		
			    	}else if(credit_acc==3) {
			    		user.setBalance_2(amount+user.getBalance_2());
			    		usr.save(user);
			    		
			    	}else {
			    		return 2;
			    	}
			    	
					   Transaction tran = new Transaction();
					   tran.setAcc_dest(credit_acc);
					   tran.setAmount(amount);
					   tran.setType_of_transaction(1);
					   
					   if(Receipient_name.equals("nul")) {
						  tran.setUpi_address(UPI);
						  tran.setGeneration_method(1);
						  tran.setTransaction_id("UPI"+in.toString());

					   }else {
						  tran.setCard_holder(Receipient_name);
						  tran.setCard_l6_digits(Account_No);
						  tran.setGeneration_method(2);
			              tran.setTransaction_id("DE_CR"+in.toString());
					   }
					   tran.setCustomer_repoid(id);
		               if(tsr.addTransaction(tran)==1) {
		            	   return 1;
		               }else {
		            	   return 0;
		               }


			    	
			    	
			    }else if(user.getAccount_type()==1) {
			    	if(credit_acc==1) {
			    		user.setBalance_1(amount+user.getBalance_1());
			    		usr.save(user);
			    	}else {
			    		return 2;
			    	}
			    	
					   Transaction tran = new Transaction();
					   tran.setAcc_dest(credit_acc);
					   tran.setAmount(amount);
					   tran.setType_of_transaction(1);
					   
					   if(Receipient_name.equals("nul")) {
						  tran.setUpi_address(UPI);
						  tran.setGeneration_method(1);
    		              tran.setTransaction_id("UPI"+in.toString());


					   }else {
						  tran.setCard_holder(Receipient_name);
						  tran.setCard_l6_digits(Account_No);
						  tran.setGeneration_method(2);
			              tran.setTransaction_id("DE_CR"+in.toString());
 
					   }
					   tran.setCustomer_repoid(id);
					   
		               if(tsr.addTransaction(tran)==1) {
		            	   return 1;
		               }else {
		            	   return 56;
		               }


			    	
			    	
			    	
			    	
			    }else if(user.getAccount_type()==3) {
			    	if(credit_acc==3) {
			    		user.setBalance_2(amount+user.getBalance_2());
			    		usr.save(user);
			    	}else {
			    		return 2;
			    	}
			    	
					   Transaction tran = new Transaction();
					   tran.setAcc_dest(credit_acc);
					   tran.setAmount(amount);
					   tran.setType_of_transaction(1);
					   if(Receipient_name.equals("nul")) {
						  tran.setUpi_address(UPI);
						  tran.setGeneration_method(1);
			              tran.setTransaction_id("UPI"+in.toString());
 

					   }else {
						  tran.setCard_holder(Receipient_name);
						  tran.setCard_l6_digits(Account_No);
						  tran.setGeneration_method(2);
			              tran.setTransaction_id("DE_CR"+in.toString());

					   }
					   tran.setCustomer_repoid(id);
					   
		               if(tsr.addTransaction(tran)==1) {
		            	   return 1;
		               }else {
		            	   return 56;
		               }


			    	
			    	
			    	
			    }else {
			    	return 0;
			    }
			}else {
				return 3;
			}
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	
	
	
	
	
	
}
