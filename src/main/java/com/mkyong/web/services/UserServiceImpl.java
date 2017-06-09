/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.services;

import com.mkyong.web.dao.UserDao;
import com.mkyong.web.model.Bitacoras;
import com.mkyong.web.model.Permissions;
import com.mkyong.web.model.Roles;
import com.mkyong.web.model.Users;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ProasEvolution
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    public UserDao userDao;

    @Override
    public Users findByName(String name) {
        return userDao.findByName(name);
    }

    @Override
    public List<Users> findAll() {
        return userDao.findAll();
    }

    @Override
    public Users findById(int pid) {
        return userDao.findById(pid);
    }

    @Override
    public Integer addUsers(Users user) {
        Integer id = userDao.addUsers(user);
        return id;
    }

    @Override
    public void updateUsers(Users user) {
        userDao.updateUsers(user);
    }

    @Override
    public void deleteUsers(int pid) {
        userDao.deleteUsers(pid);
    }

    @Override
    public boolean userExists(String username) {
        return userDao.userExists(username);
    }

    @Override
    public Users findUserByPass(String name, String pass) {
        return userDao.findUserByPass(name, pass);
    }

    @Override
    public List<Roles> findRoleByUserName(String name) {
        return userDao.findRoleByUserName(name);
    }

    @Override
    public List<Permissions> findPermissionByUserName(String name) {
        return userDao.findPermissionByUserName(name);
    }

    @Override
    public List<Roles> findRoleByUserId(int id) {
        return userDao.findRolByUserId(id);

    }

    @Override
    public void updatePassword(int iduser, String newPass, String oldPass) {
        userDao.updatePassword(iduser, newPass, oldPass);
    }

    @Override
    public Integer addBitacora(String username) {
        Users user = findByName(username);
        System.out.println("akiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        Bitacoras bit = new Bitacoras(user, new Date(), "Lastlogin", "logueo en el sistema");
        return userDao.addBitacora(bit);
    }
}
