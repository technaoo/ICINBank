package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bean.Cheques;

@Repository
public interface Cheque_Repository extends JpaRepository<Cheques, Integer> {

}
