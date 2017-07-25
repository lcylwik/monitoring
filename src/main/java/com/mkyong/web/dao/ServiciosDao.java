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

/**
 *
 * @author lianet
 */
public interface ServiciosDao {

    //bancos
    List<Bancos> findAll();

    Bancos findById(int pid);

    Integer addBancos(Bancos ban);

    void updateBancos(Bancos ban);

    void deleteBancos(int pid);

  

    //tipotarjeta
    List<Tipotarjeta> findAll2();

    Tipotarjeta findById2(int pid);

    Integer addTipotarjeta(Tipotarjeta tt);

    void updateTipotarjeta(Tipotarjeta tt);

    void deleteTipotarjeta(int pid);

  

    //prefijos
    List<Prefijos> findAll3();

    Prefijos findById3(int pid);

    Integer addPrefijos(Prefijos pre);

    void updatePrefijos(Prefijos pre);

    void deletePrefijos(int pid);

  

    //servicios
    List<Servicio> findAll4();

    Servicio findById4(int pid);

    Integer addServicio(Servicio serv);

    void updateServicio(Servicio serv);

    void deleteServicio(int pid);

  

}
