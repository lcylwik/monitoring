/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.controller;

import com.mkyong.web.model.Configuracion;
import com.mkyong.web.model.Permissions;
import com.mkyong.web.model.Roles;
import com.mkyong.web.model.Users;
import com.mkyong.web.services.RolService;
import com.mkyong.web.services.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

/**
 *
 * @author ProasEvolution
 */
@RestController
@RequestMapping("api")
public class UserController {

    @Autowired
    private UserService userservice;

    @Autowired
    private RolService rolservice;

    @RequestMapping(value = "/name", method = RequestMethod.GET)
    public Users find() {
        Users user = userservice.findByName("lia");
        return user;
    }

    @RequestMapping(value = "/userPermission", method = RequestMethod.GET)
    public List<Permissions> userPermission(@RequestParam(value = "name") String name) {
        List<Permissions> p = userservice.findPermissionByUserName(name);
        return p;
    }

    @RequestMapping(value = "/userRol", method = RequestMethod.GET)
    public List<Roles> userRol(@RequestParam(value = "name") String name) {
        List<Roles> r = userservice.findRoleByUserName(name);
        return r;
    }

    @RequestMapping(value = "users/rol/{id}", method = RequestMethod.GET)
    public List<Roles> getRolByUserID(@RequestParam(value = "id") int id) {
        List<Roles> r = userservice.findRoleByUserId(id);
        return r;
    }

    //crud user
    @RequestMapping(value = "users/{id}", method = RequestMethod.GET)
    public Users geUserById(@PathVariable("id") Integer id) {
        Users user = userservice.findById(id);
        return user;
    }

    @RequestMapping(value = "users", method = RequestMethod.GET)
    public List<Users> getAllUsers() {
        List<Users> list = userservice.findAll();
        return list;
    }

    @RequestMapping(value = "users", method = RequestMethod.POST)
    public void addUser(@RequestBody Users user, UriComponentsBuilder builder) {
        Integer userID = userservice.addUsers(user);

    }

    @RequestMapping(value = "users", method = RequestMethod.PUT)
    public void updateUser(@RequestBody Users user) {
        userservice.updateUsers(user);
    }

    @RequestMapping(value = "users/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable("id") Integer id) {
        userservice.deleteUsers(id);
    }

    @RequestMapping(value = "/usersRepeat/{name}", method = RequestMethod.GET)
    public boolean usersRepeat(@PathVariable("name") String name) {
       return userservice.userExists(name);
    }

    @RequestMapping(value = "user/updatePassword/{id}", method = RequestMethod.POST)
    public void updatePass(@PathVariable("id") int id, @RequestBody Paswords passwords) throws ServletException {
        if (passwords.password.equals(passwords.password_confirmation)) {
            userservice.updatePassword(id, passwords.password, passwords.current_password);
        } else {
            throw new ServletException("El password de confirmacion es incorrecto o null");
        }
    }

    @SuppressWarnings("unused")
    private static class Paswords {

        public String current_password;
        public String password;
        public String password_confirmation;

        public Paswords() {
        }

        public Paswords(String current_password, String password, String password_confirmation) {
            this.current_password = current_password;
            this.password = password;
            this.password_confirmation = password_confirmation;
        }

    }

    //add config
    @RequestMapping(value = "/rest/config/{id}", method = RequestMethod.PUT)
    public void addConfig(@RequestBody Configuracion config, @PathVariable("id") Integer id) {
        userservice.addConfiguration(config, id);
    }

    @RequestMapping(value = "/rest/config/{id}", method = RequestMethod.GET)
    public Configuracion findConfig(@PathVariable("id") Integer id) {
        Configuracion config = userservice.getConfigurationByID(id);
        return config;
    }

    @RequestMapping(value = "/rest/config", method = RequestMethod.GET)
    public List<Configuracion> findAllConfig() {
        List<Configuracion> config = userservice.getConfiguration();
        return config;
    }
}
