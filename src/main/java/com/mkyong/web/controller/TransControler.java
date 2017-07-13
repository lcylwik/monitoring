/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.controller;

import com.mkyong.web.model.Eventos;
import com.mkyong.web.model.FilterTxn;
import com.mkyong.web.model.Txn;
import com.mkyong.web.services.EventoService;
import com.mkyong.web.services.TransService;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Lianet
 */
@RestController
@RequestMapping("api")
public class TransControler {

    @Autowired
    private TransService transservice;

    @RequestMapping(value = "/rest/txn", method = RequestMethod.GET)
    public List<Txn> findAllTxn() {
        List<Txn> txns = transservice.getTransacciones();
        return txns;
    }

    @RequestMapping(value = "/rest/txnByDate/{from}/{to}", method = RequestMethod.GET)
    public List<Txn> findAllByDate(@PathVariable("from") Date from, @PathVariable("to") Date to) {
        List<Txn> txns = transservice.getTxnByDate(from, to);
        return txns;
    }

    @RequestMapping(value = "/rest/est/{ejeY}/{ejeX}", method = RequestMethod.GET)
    public Object findAllEstadistico(@PathVariable("ejeY") String ejeY,@PathVariable("ejeX") String ejeX,@RequestBody FilterTxn filters) {
        Object estadistico = transservice.getEstadistico(ejeY,ejeX,filters);
        return estadistico;
    }
    }
