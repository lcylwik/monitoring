/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.dao;

import com.mkyong.web.model.Permissions;
import java.util.List;

/**
 *
 * @author ProasEvolution
 */
public interface PermissionsDao {

    Permissions findByName(String name);

    List<Permissions> findAll();

    Permissions findById(int pid);

    Integer addPermissions(Permissions perm);

    void updatePermissions(Permissions perm);

    void deletePermissions(int pid);
}
