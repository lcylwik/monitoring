/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.services;

import com.mkyong.web.dao.PermissionsDao;
import com.mkyong.web.model.Permissions;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ProasEvolution
 */
@Service
public class PermissionsServiceImpl implements PermissionsService {
    
    @Autowired
    private PermissionsDao permissionsDao;
    
    @Override
    public Permissions findByName(String name) {
        return permissionsDao.findByName(name);
    }
    
    @Override
    public List<Permissions> findAll() {
        return permissionsDao.findAll();
    }
    
    @Override
    public Permissions findById(int pid) {
        return permissionsDao.findById(pid);
    }
    
    @Override
    public Integer addPermissions(Permissions perm) {
        return permissionsDao.addPermissions(perm);
    }
    
    @Override
    public void updatePermissions(Permissions perm) {
        permissionsDao.updatePermissions(perm);
    }
    
    @Override
    public void deletePermissions(int pid) {
        permissionsDao.deletePermissions(pid);
    }
    
}
