/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.dao;

import com.mkyong.web.model.Permissions;
import com.mkyong.web.model.Roles;
import java.util.Date;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ProasEvolution
 */
@Repository
public class PermissionsDaoImpl implements PermissionsDao {

    @Override
    public Permissions findByName(String name) {
        Session sesion = SessionUtil1.getSession();
        Permissions perm = (Permissions) sesion.createCriteria(Permissions.class).add(Restrictions.eq("name", name)).uniqueResult();
        sesion.close();
        return perm;
    }

    @Override
    public List<Permissions> findAll() {
        Session sesion = SessionUtil1.getSession();
        List<Permissions> perm = sesion.createCriteria(Permissions.class).list();
        sesion.close();
        return perm;
    }

    @Override
    public Permissions findById(int pid) {
        Session sesion = SessionUtil1.getSession();
        Permissions perm = (Permissions) sesion.createCriteria(Permissions.class).add(Restrictions.eq("id", pid)).uniqueResult();
        sesion.close();
        return perm;
    }

    @Override
    public Integer addPermissions(Permissions perm) {
        Session session = SessionUtil1.getSession();
        Transaction tx = null;
        Integer idPerm = 0;
        try {
            tx = session.beginTransaction();
            idPerm = (Integer) session.save(perm);
            tx.commit();
        } catch (HibernateException e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
        return idPerm;
    }

    @Override
    public void updatePermissions(Permissions perm) {
        Permissions permDB = findById(perm.getId());
        Session session = SessionUtil1.getSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            permDB.setCreatedAt(perm.getCreatedAt());
            permDB.setDescription(perm.getDescription());
            permDB.setName(perm.getName());
            permDB.setDisplayName(perm.getDisplayName());
            permDB.setUpdatedAt(new Date());
            permDB.setRoleses(perm.getRoleses());
            permDB.setCreatedAt(perm.getCreatedAt());
            session.saveOrUpdate(permDB);
            tx.commit();
        } catch (HibernateException e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
    }

    @Override
    public void deletePermissions(int pid) {
        
        Permissions permDB = findById(pid);
        Session session = SessionUtil1.getSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            session.delete(permDB);
            tx.commit();
        } catch (HibernateException e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
    }
}
