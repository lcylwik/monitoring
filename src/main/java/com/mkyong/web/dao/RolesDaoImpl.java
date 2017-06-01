/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.dao;

import com.mkyong.web.model.Permissions;
import com.mkyong.web.model.Roles;
import com.mkyong.web.model.Users;
import java.util.Date;
import java.util.List;
import org.hibernate.Criteria;
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
public class RolesDaoImpl implements RolesDao {

    @Override
    public Roles findByName(String name) {
        Session sesion = SessionUtil1.getSession();
        Roles roles = (Roles) sesion.createCriteria(Roles.class).add(Restrictions.eq("name", name)).uniqueResult();
        sesion.close();
        return roles;
    }

    @Override
    public List<Roles> findAll() {
        Session sesion = SessionUtil1.getSession();
        List<Roles> rol = sesion.createCriteria(Roles.class).list();
        sesion.close();
        return rol;
    }

    @Override
    public Roles findById(int pid) {
        Session sesion = SessionUtil1.getSession();
        Roles roles = (Roles) sesion.createCriteria(Roles.class).add(Restrictions.eq("id", pid)).uniqueResult();
        sesion.close();
        return roles;
    }

    @Override
    public Integer addRoles(Roles rol) {
         rol.setCreatedAt(new Date());
        Session session = SessionUtil1.getSession();
        Transaction tx = null;
        Integer idRol = 0;
        try {
            tx = session.beginTransaction();
            idRol = (Integer) session.save(rol);
            tx.commit();
        } catch (HibernateException e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
        return idRol;
    }

    @Override
    public void updateRoles(Roles rol) {
        Roles rolDB = findById(rol.getId());

        Session session = SessionUtil1.getSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            rolDB.setCreatedAt(rol.getCreatedAt());
            rolDB.setDescription(rol.getDescription());
            rolDB.setName(rol.getName());
            rolDB.setDisplayName(rol.getDisplayName());
            rolDB.setUpdatedAt(new Date());
            rolDB.setPermissionses(rol.getPermissionses());
            session.saveOrUpdate(rolDB);
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
    public void deleteRoles(int pid) {
        Roles rolDB = findById(pid);
        Session session = SessionUtil1.getSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            session.delete(rolDB);
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
    public List<Permissions> findPermByRolId(int id) {
        Session sesion = SessionUtil1.getSession();
        List<Permissions> p = sesion.createCriteria(Permissions.class)
                .createAlias("roleses", "r")
                .add(Restrictions.eq("r.id", id))
                .setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
                .list();
        return p;
    }

}
