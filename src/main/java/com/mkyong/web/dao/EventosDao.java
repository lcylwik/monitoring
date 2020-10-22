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
import java.util.List;
import javax.servlet.ServletException;

/**
 *
 * @author ProasEvolution
 */
public interface EventosDao {

   

    List<Eventos> findAll();

    Eventos findById(int pid);

    Integer addEventos(Eventos user);

    void updateEventos(Eventos user);

    void deleteEventos(int pid);

   
 
}
