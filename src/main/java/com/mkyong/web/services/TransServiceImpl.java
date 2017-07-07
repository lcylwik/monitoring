/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.services;

import com.mkyong.web.dao.TransDao;
import com.mkyong.web.model.Estadistico;
import com.mkyong.web.model.Txn;

import java.util.Date;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ProasEvolution
 */
@Service
public class TransServiceImpl implements TransService {

    @Autowired
    private TransDao trasdao;

    @Override
    public List<Txn> getTransacciones() {
        return trasdao.getTransacciones();
    }

    @Override
    public List<Object> getEstadistico() {
        return trasdao.getEstadistico();
    }

    @Override
    public Integer addEstadistico(Estadistico estadistico) {
        return trasdao.addEstadistico(estadistico);
    }

    @Override
    public Boolean checkMonthIsCalculated(Date date) {
        return trasdao.checkMonthIsCalculated(date);
    }

    @Override
    public Date getFirstTransaction() {
        return trasdao.getFirstTransaction();
    }

    @Override
    public List<String> getCodigo() {
        return trasdao.getCodigo();
    }

    @Override
    public Iterator getCantFechaByCode(String code, Date fromDate, Date toDate) {
        return trasdao.getCantFechaByCode(code, fromDate, toDate);
    }

    @Override
    public List<Txn> getTxnByDate(Date from, Date to) {
        return trasdao.getTxnByDate(from, to);
    }
}
