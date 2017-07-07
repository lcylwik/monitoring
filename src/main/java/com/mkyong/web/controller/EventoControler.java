/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.controller;

import com.mkyong.web.model.Eventos;
import com.mkyong.web.model.Txn;
import com.mkyong.web.services.EventoService;
import com.mkyong.web.services.TransService;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

/**
 *
 * @author Lianet
 */

@RestController
@RequestMapping("api")
public class EventoControler {

    @Autowired
    private EventoService eventoservice;

    @RequestMapping(value = "eventos/{id}", method = RequestMethod.GET)
    public Eventos getEventoById(@PathVariable("id") Integer id) {
        Eventos evento = eventoservice.findById(id);
        return evento;
    }

    @RequestMapping(value = "eventos", method = RequestMethod.GET)
    public List<Eventos> getAllEventos() {
        List<Eventos> list = eventoservice.findAll();
        return list;
    }

    @RequestMapping(value = "eventos", method = RequestMethod.POST)
    public void addEvento(@RequestBody Eventos evento, UriComponentsBuilder builder) {
        Integer userID = eventoservice.addEventos(evento);

    }

    @RequestMapping(value = "eventos", method = RequestMethod.PUT)
    public void updateUser(@RequestBody Eventos evento) {
        eventoservice.updateEventos(evento);
    }

    @RequestMapping(value = "eventos/{id}", method = RequestMethod.DELETE)
    public void deleteEvento(@PathVariable("id") Integer id) {
        eventoservice.deleteEventos(id);
    }
}
