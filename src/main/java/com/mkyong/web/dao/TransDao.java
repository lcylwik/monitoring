/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.dao;

import com.mkyong.web.model.Estadistico;
import com.mkyong.web.model.FilterTxn;
import com.mkyong.web.model.Txn;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 *
 * @author Lianet
 */
public interface TransDao {

    public List<Txn> getTransacciones();
    public Object getEstadistico(String ejeY,String ejeX,FilterTxn filters);

    public Integer addEstadistico(Estadistico estadistico);
    
    public Boolean checkMonthIsCalculated(Date date);
    
    public Date getFirstTransaction();

    public List<String> getCodigo();

    public Iterator getCantFechaByCode(String code,Date fromDate, Date toDate);
    
     public List<Txn> getTxnByDate(Date from, Date to);
    
   
}
