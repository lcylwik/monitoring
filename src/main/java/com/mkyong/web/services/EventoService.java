/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.services;

import com.mkyong.web.model.Eventos;
import java.util.List;

/**
 *
 * @author USER
 */
public interface EventoService {
 
    List<Eventos> findAll();

    Eventos findById(int pid);

    Integer addEventos(Eventos evento);

    void updateEventos(Eventos evento);

    void deleteEventos(int pid);   
}
