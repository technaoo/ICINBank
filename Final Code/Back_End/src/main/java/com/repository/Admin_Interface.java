package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bean.Admin;

@Repository
public interface Admin_Interface extends JpaRepository<Admin, Integer>{

}
