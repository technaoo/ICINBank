package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bean.Transaction;
@Repository
public interface Transaction_Repository extends JpaRepository<Transaction,String> {

}
