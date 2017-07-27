/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.controller;

import com.mkyong.web.model.Bancos;
import com.mkyong.web.model.Eventos;
import com.mkyong.web.model.Prefijos;
import com.mkyong.web.model.Servicio;
import com.mkyong.web.model.Tipotarjeta;
import com.mkyong.web.services.EventoService;
import com.mkyong.web.services.ServicesService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author lianet
 */
@RestController
@RequestMapping("api/resources/")
public class ServiciosController {

    @Autowired
    private ServicesService service;

    @RequestMapping(value = "service", method = RequestMethod.GET)
    public List<Servicio> getAllServicios() {
        List<Servicio> list = service.findAll4();
        return list;
    }

    @RequestMapping(value = "banco", method = RequestMethod.GET)
    public List<Bancos> getAllBancos() {
        List<Bancos> list = service.findAll();
        return list;
    }

    @RequestMapping(value = "tipotarjeta", method = RequestMethod.GET)
    public List<Tipotarjeta> getAllTipoTarjeta() {
        List<Tipotarjeta> list = service.findAll2();
        return list;
    }

    @RequestMapping(value = "prefijo", method = RequestMethod.GET)
    public List<Prefijos> getAllPrefijos() {
        List<Prefijos> list = service.findAll3();
        return list;
    }

}
