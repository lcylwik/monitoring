/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.services;

import com.mkyong.web.model.Permissions;
import com.mkyong.web.model.Roles;
import java.util.List;

/**
 *
 * @author ProasEvolution
 */
public interface RolService {

    List<Permissions> findPermByRolId(int id);

    Roles findByName(String name);

    List<Roles> findAll();

    Roles findById(int pid);

    Integer addRoles(Roles rol);

    void updateRoles(Roles rol);

    void deleteRoles(int pid);
}
