/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.controller;

import com.mkyong.web.model.PrsaRejectedTxn;
import com.mkyong.web.model.PrsaTxnAceptadas;
import com.mkyong.web.model.Txn;
import com.mkyong.web.services.TransService;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
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

    @RequestMapping(value = "/rest/estadistico", method = RequestMethod.GET)
    public List<Object> findAllEstadistico() {
        List<Object> estadistico = transservice.getEstadistico();
        return estadistico;
    }
}
