/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.dao;

import com.mkyong.web.model.Bitacoras;
import com.mkyong.web.model.Permissions;
import com.mkyong.web.model.Roles;
import com.mkyong.web.model.Users;
import java.util.List;
import javax.servlet.ServletException;

/**
 *
 * @author ProasEvolution
 */
public interface UserDao {
    
    List<Permissions> findPermissionByUserName(String name);
    
    List<Roles> findRolByUserId(int id);

    List<Roles> findRoleByUserName(String name);

    Users findUserByPass(String name, String pass);
    

    Users findByName(String name);

    List<Users> findAll();

    Users findById(int pid);

    Integer addUsers(Users user);

    void updateUsers(Users user);

    void deleteUsers(int pid);

    boolean userExists(String username);
    
    void updatePassword(int iduser, String newPass,String oldPass);
    
    Integer addBitacora(Bitacoras bit);

    

}
