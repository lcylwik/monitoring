/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.dao;

import com.mkyong.web.model.Bitacoras;
import com.mkyong.web.model.Permissions;
import com.mkyong.web.model.Roles;
import com.mkyong.web.model.Users;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.transaction.Transactional;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Example;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;
import org.apache.commons.codec.digest.DigestUtils;
import org.hibernate.FetchMode;

/**
 *
 * @author ProasEvolution
 */
@Repository
public class UserDaoImpl implements UserDao {

    @Override
    public Users findByName(String name) {
        Session sesion = SessionUtil1.getSession();
        Users user = (Users) sesion.createCriteria(Users.class).add(Restrictions.eq("name", name)).uniqueResult();
        sesion.close();
        return user;
    }

    @Override
    public List<Users> findAll() {

        Session sesion = SessionUtil1.getSession();
        Criteria crit = sesion.createCriteria(Users.class);
        List<Users> users = crit.list();
        sesion.close();

        return users;
    }

    @Override
    public Users findById(int id) {
        Session sesion = SessionUtil1.getSession();
        Users user = (Users) sesion.createCriteria(Users.class
        ).add(Restrictions.eq("id", id)).uniqueResult();
        sesion.close();
        return user;
    }

    @Override
    public Integer addUsers(Users user) {
        Session session = SessionUtil1.getSession();
        Transaction tx = null;
        Integer idUser = 0;
        String passEncrip = DigestUtils.md5Hex(user.getPassword());
        user.setPassword(passEncrip);
        try {
            tx = session.beginTransaction();
            idUser = (Integer) session.save(user);
            tx.commit();
        } catch (HibernateException e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
        return idUser;
    }

    @Override
    public void updateUsers(Users user) {
        Users userDB = findById(user.getId());

        Session session = SessionUtil1.getSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            userDB.setCreatedAt(user.getCreatedAt());
            userDB.setEmail(user.getEmail());
            userDB.setName(user.getName());
            userDB.setRoleses(user.getRoleses());
            userDB.setUpdatedAt(new Date());
            session.saveOrUpdate(userDB);
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
    public void deleteUsers(int pid) {
        Users userDB = findById(pid);
        Session session = SessionUtil1.getSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            session.delete(userDB);
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
    public boolean userExists(String username) {
        return findByName(username) != null;
    }

    @Override
    public Users findUserByPass(String name, String pass) {
        Session sesion = SessionUtil1.getSession();
        String passEncrip = DigestUtils.md5Hex(pass);
        Users user = (Users) sesion.createCriteria(Users.class
        ).add(Restrictions.eq("name", name))
                .add(Restrictions.eq("password", passEncrip)).uniqueResult();
        return user;
    }

    @Override
    public List<Permissions> findPermissionByUserName(String name) {
        Session sesion = SessionUtil1.getSession();
        List<Permissions> perm = sesion.createCriteria(Permissions.class
        )
                .createAlias("roleses", "r").createAlias("r.userses", "ru")
                .add(Restrictions.eq("ru.name", name))
                .setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
                .list();
        return perm;
    }

    @Override
    public List<Roles> findRoleByUserName(String name) {
        Session sesion = SessionUtil1.getSession();
        List<Roles> roles = sesion.createCriteria(Roles.class
        )
                .createAlias("userses", "u")
                .add(Restrictions.eq("u.name", name))
                .setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
                .list();
        return roles;
    }

    @Override
    public List<Roles> findRolByUserId(int id) {
        Session sesion = SessionUtil1.getSession();
        List<Roles> roles = sesion.createCriteria(Roles.class
        )
                .createAlias("userses", "u")
                .add(Restrictions.eq("u.id", id))
                .setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
                .list();
        return roles;
    }

    @Override
    public void updatePassword(int iduser, String newPass, String oldPass) {
        Users userDB = findById(iduser);

        String oldPassEncrip = DigestUtils.md5Hex(oldPass);
        if (userDB.getPassword().equals(oldPassEncrip)) {

            String passEncrip = DigestUtils.md5Hex(newPass);
            userDB.setPassword(passEncrip);

            Session session = SessionUtil1.getSession();
            Transaction tx = null;

            try {
                tx = session.beginTransaction();
                session.saveOrUpdate(userDB);
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

    @Override
    public Integer addBitacora(Bitacoras bit) {
        Session session = SessionUtil1.getSession();
        Transaction tx = null;
        Integer idBit = 0;

        try {
            tx = session.beginTransaction();
            idBit = (Integer) session.save(bit);
            tx.commit();
        } catch (HibernateException e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
        return idBit;
    }

   
}
