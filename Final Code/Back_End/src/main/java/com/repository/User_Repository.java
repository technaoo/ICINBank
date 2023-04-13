package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.bean.User;
@Repository
public interface User_Repository extends  JpaRepository<User, Integer>{

}
