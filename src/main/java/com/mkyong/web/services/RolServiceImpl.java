/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.services;

import com.mkyong.web.dao.RolesDao;
import com.mkyong.web.model.Permissions;
import com.mkyong.web.model.Roles;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ProasEvolution
 */
@Service
public class RolServiceImpl implements RolService {

    @Autowired
    private RolesDao roldao;

    @Override
    public Roles findByName(String name) {
        return roldao.findByName(name);
    }

    @Override
    public List<Roles> findAll() {
        return roldao.findAll();
    }

    @Override
    public Roles findById(int pid) {
        return roldao.findById(pid);
    }

    @Override
    public Integer addRoles(Roles rol) {
        return roldao.addRoles(rol);
    }

    @Override
    public void updateRoles(Roles rol) {
        roldao.updateRoles(rol);
    }

    @Override
    public void deleteRoles(int pid) {
        roldao.deleteRoles(pid);
    }

    @Override
    public List<Permissions> findPermByRolId(int id) {
       return roldao.findPermByRolId(id);
     }

  

  

}
