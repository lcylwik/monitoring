/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.dao;

import com.mkyong.web.model.Bancos;
import com.mkyong.web.model.Prefijos;
import com.mkyong.web.model.Servicio;
import com.mkyong.web.model.Tipotarjeta;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author lianet
 */
@Repository
public class ServiciosDaoImpl implements ServiciosDao {

    //bancos
    @Override
    public List<Bancos> findAll() {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        List<Bancos> bancos = session.createCriteria(Bancos.class).list();
        session.getTransaction().commit();
        session.close();
        return bancos;
    }

    @Override
    public Bancos findById(int pid) {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        Bancos var = (Bancos) session.createCriteria(Bancos.class).add(Restrictions.eq("idbanco", pid)).uniqueResult();
        session.getTransaction().commit();
        session.close();
        return var;
    }

    @Override
    public Integer addBancos(Bancos ban) {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        Integer id = (Integer) session.save(ban);
        session.getTransaction().commit();
        session.close();
        return id;
    }

    @Override
    public void updateBancos(Bancos ban) {
        Bancos vardB = findById(ban.getIdbanco());

        vardB.setFiid(ban.getFiid());
        vardB.setName(ban.getName());
        vardB.setTipotarjetas(ban.getTipotarjetas());

        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        session.saveOrUpdate(vardB);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void deleteBancos(int pid) {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        session.delete(pid);
        session.getTransaction().commit();
        session.close();
    }


    //tipotarjeta
    @Override
    public List<Tipotarjeta> findAll2() {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        List<Tipotarjeta> tipotarjetas = session.createCriteria(Tipotarjeta.class).list();
        session.getTransaction().commit();
        session.close();
        return tipotarjetas;
    }

    @Override
    public Tipotarjeta findById2(int pid) {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        Tipotarjeta var = (Tipotarjeta) session.createCriteria(Tipotarjeta.class).add(Restrictions.eq("idttarjeta", pid)).uniqueResult();
        session.getTransaction().commit();
        session.close();
        return var;
    }

    @Override
    public Integer addTipotarjeta(Tipotarjeta tt) {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        Integer id = (Integer) session.save(tt);
        session.getTransaction().commit();
        session.close();
        return id;
    }

    @Override
    public void updateTipotarjeta(Tipotarjeta tt) {
        Tipotarjeta vardB = findById2(tt.getIdttarjeta());

        vardB.setName(tt.getName());
        vardB.setPrefijoses(tt.getPrefijoses());
        vardB.setBancoses(tt.getBancoses());

        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        session.saveOrUpdate(vardB);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void deleteTipotarjeta(int pid) {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        session.delete(pid);
        session.getTransaction().commit();
        session.close();
    }

   

    //prefijos
    @Override
    public List<Prefijos> findAll3() {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        List<Prefijos> prefijos = session.createCriteria(Prefijos.class).list();
        session.getTransaction().commit();
        session.close();
        return prefijos;
    }

    @Override
    public Prefijos findById3(int pid) {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        Prefijos var = (Prefijos) session.createCriteria(Prefijos.class).add(Restrictions.eq("idprefijo", pid)).uniqueResult();
        session.getTransaction().commit();
        session.close();
        return var;
    }

    @Override
    public Integer addPrefijos(Prefijos pre) {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        Integer id = (Integer) session.save(pre);
        session.getTransaction().commit();
        session.close();
        return id;
    }

    @Override
    public void updatePrefijos(Prefijos pre) {
        Prefijos vardB = findById3(pre.getIdprefijo());

        vardB.setName(pre.getName());
        vardB.setServicios(pre.getServicios());
        vardB.setTipotarjeta(pre.getTipotarjeta());

        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        session.saveOrUpdate(vardB);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void deletePrefijos(int pid) {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        session.delete(pid);
        session.getTransaction().commit();
        session.close();
    }

   

    //servicios
    @Override
    public List<Servicio> findAll4() {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        List<Servicio> servicios = session.createCriteria(Servicio.class).list();
        session.getTransaction().commit();
        session.close();
        return servicios;
    }

    @Override
    public Servicio findById4(int pid) {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        Servicio var = (Servicio) session.createCriteria(Servicio.class).add(Restrictions.eq("idservicio", pid)).uniqueResult();
        session.getTransaction().commit();
        session.close();
        return var;
    }

    @Override
    public Integer addServicio(Servicio serv) {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        Integer id = (Integer) session.save(serv);
        session.getTransaction().commit();
        session.close();
        return id;
    }

    @Override
    public void updateServicio(Servicio serv) {
        Servicio vardB = findById4(serv.getIdservicio());

        vardB.setName(serv.getName());
        vardB.setPrefijoses(serv.getPrefijoses());
        vardB.setProducto(serv.getProducto());

        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        session.saveOrUpdate(vardB);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void deleteServicio(int pid) {
        Session session = SessionUtil1.getSession();
        session.getTransaction().begin();
        session.delete(pid);
        session.getTransaction().commit();
        session.close();
    }

 

}
