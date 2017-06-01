/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.controller;

import com.mkyong.web.model.Permissions;
import com.mkyong.web.services.PermissionsService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
public class PermissionsController {

    @Autowired
    private PermissionsService permService;

    @RequestMapping(value = "/resources/perm/{id}", method = RequestMethod.GET)
    public ResponseEntity<Permissions> gePermissionById(@PathVariable("id") Integer id) {
        Permissions perm = permService.findById(id);
        return new ResponseEntity<Permissions>(perm, HttpStatus.OK);
    }

    @RequestMapping(value = "/resources/perm", method = RequestMethod.GET)
    public List<Permissions> getAllPermissions() {
        List<Permissions> list = permService.findAll();
        return list;
    }

    @RequestMapping(value = "/resources/perm", method = RequestMethod.POST)
    public void addPermission(@RequestBody Permissions perm, UriComponentsBuilder builder) {
        Integer flag = permService.addPermissions(perm);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/rol/{id}").buildAndExpand(perm.getId()).toUri());
    }

    @RequestMapping(value = "/resources/perm/{id}", method = RequestMethod.PUT)
    public Permissions updatePermission(@RequestBody Permissions perm, @PathVariable("id") Integer id) {
        permService.updatePermissions(perm);
        return perm;
    }

    @RequestMapping(value = "/resources/perm/{id}", method = RequestMethod.DELETE)
    public void deletePermission(@PathVariable("id") Integer id) {
        permService.deletePermissions(id);
    }

}
