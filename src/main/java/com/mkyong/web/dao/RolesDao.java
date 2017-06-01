/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.dao;

import com.mkyong.web.model.Permissions;
import com.mkyong.web.model.Roles;
import com.mkyong.web.model.Users;
import java.util.List;

/**
 *
 * @author ProasEvolution
 */
public interface RolesDao {

    Roles findByName(String name);

    List<Permissions> findPermByRolId(int id);

    List<Roles> findAll();

    Roles findById(int pid);

    Integer addRoles(Roles rol);

    void updateRoles(Roles rol);

    void deleteRoles(int pid);
    
}
