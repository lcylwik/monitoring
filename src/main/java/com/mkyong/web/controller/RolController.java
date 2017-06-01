/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.controller;

import com.mkyong.web.model.Permissions;
import com.mkyong.web.model.Roles;
import com.mkyong.web.services.RolService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

/**
 *
 * @author ProasEvolution
 */
@RestController
@RequestMapping("api")
public class RolController {

    @Autowired
    private RolService rolservice;

    @RequestMapping(value = "/resources/rol/{id}", method = RequestMethod.GET)
    public Roles getRolById(@PathVariable("id") Integer id) {
        Roles rol = rolservice.findById(id);
        return rol;
    }

    @RequestMapping(value = "/resources/rol", method = RequestMethod.GET)
    public List<Roles> getAllRoles() {
        List<Roles> list = rolservice.findAll();
        return list;
    }

    @RequestMapping(value = "/resources/rol", method = RequestMethod.POST)
    public void addRole(@RequestBody Roles rol, UriComponentsBuilder builder) {
        Integer flag = rolservice.addRoles(rol);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/resources/rol/{id}").buildAndExpand(rol.getId()).toUri());
    }

    @RequestMapping(value = "/resources/rol/{id}", method = RequestMethod.PUT)
    public Roles updateRole(@RequestBody Roles rol, @PathVariable("id") Integer id) {
        rolservice.updateRoles(rol);
        return rol;
    }

    @RequestMapping(value = "/resources/rol/{id}", method = RequestMethod.DELETE)
    public void deleteRole(@PathVariable("id") Integer id) {
        rolservice.deleteRoles(id);
    }

    
     @RequestMapping(value = "/resources/rol/perm/{id}", method = RequestMethod.GET)
    public List<Permissions> getPermByRolId(@PathVariable("id") Integer id) {
        List<Permissions> p = rolservice.findPermByRolId(id);
        return p;
    }
}
