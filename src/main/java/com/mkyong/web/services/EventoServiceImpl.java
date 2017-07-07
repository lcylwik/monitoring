/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.services;

import com.mkyong.web.dao.EventosDao;
import com.mkyong.web.model.Eventos;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author USER
 */
@Service
public class EventoServiceImpl implements EventoService {
    
    @Autowired
    private EventosDao eventoDao;
    
    @Override
    public List<Eventos> findAll() {
        return eventoDao.findAll();
    }
    
    @Override
    public Eventos findById(int pid) {
        return eventoDao.findById(pid);
    }
    
    @Override
    public Integer addEventos(Eventos evento) {
        return eventoDao.addEventos(evento);
    }
    
    @Override
    public void updateEventos(Eventos evento) {
        eventoDao.updateEventos(evento);
    }
    
    @Override
    public void deleteEventos(int pid) {
        eventoDao.deleteEventos(pid);
    }
    
}
