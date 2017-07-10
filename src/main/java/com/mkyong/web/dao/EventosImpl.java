/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.dao;

import com.mkyong.web.model.Bitacoras;
import com.mkyong.web.model.Configuracion;
import com.mkyong.web.model.Eventos;
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
import org.hibernate.criterion.Order;

/**
 *
 * @author ProasEvolution
 */
@Repository
public class EventosImpl implements EventosDao {


    @Override
    public List<Eventos> findAll() {

        Session sesion = SessionUtil1.getSession();
        sesion.getTransaction().begin();
        Criteria crit = sesion.createCriteria(Eventos.class);
        List<Eventos> eventos = crit.list();
        sesion.getTransaction().commit();
        sesion.close();

        return eventos;
    }

    @Override
    public Eventos findById(int id) {
        Session sesion = SessionUtil1.getSession();
        sesion.beginTransaction();
        Eventos evento = (Eventos) sesion.createCriteria(Eventos.class
        ).add(Restrictions.eq("id", id)).uniqueResult();
        sesion.getTransaction().commit();
        sesion.close();
        return evento;
    }

    @Override
    public Integer addEventos(Eventos evento) {
        System.out.println("llego al ");
        Session session = SessionUtil1.getSession();
        Transaction tx = null;
        Integer idEvento = 0;
        try {
            tx = session.beginTransaction();
            idEvento = (Integer) session.save(evento);
            tx.commit();
        } catch (HibernateException e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
        return idEvento;
    }

    @Override
    public void updateEventos(Eventos evento) {
        Eventos eventoDB = findById(evento.getId());

        Session session = SessionUtil1.getSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            eventoDB.setEnd(evento.getEnd());
            eventoDB.setStart(evento.getStart());
            eventoDB.setTitle(evento.getTitle());
            evento.setValue(evento.getValue());
            session.saveOrUpdate(eventoDB);
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
    public void deleteEventos(int pid) {
        Eventos eventoDB = findById(pid);
        Session session = SessionUtil1.getSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            session.delete(eventoDB);
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
