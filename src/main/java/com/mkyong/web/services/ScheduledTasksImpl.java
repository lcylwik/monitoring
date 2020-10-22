/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.services;

import com.mkyong.web.model.Bitacoras;
import com.mkyong.web.model.Configuracion;
import com.mkyong.web.model.Estadistico;

import com.mkyong.web.model.Users;
import com.sun.javafx.image.impl.IntArgb;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.logging.Level;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

/**
 *
 * @author Lianet
 */
public class ScheduledTasksImpl implements ScheduledTasks {

    private static final Logger LOG = Logger.getLogger(ScheduledTasksImpl.class);

    @Autowired
    private UserService userService;

    @Autowired
    private TransService transservice;

    //@Scheduled(initialDelay = 30000, fixedDelay = 10500)
    @Override
    public void task1() {
        List<Users> users = userService.findAll();
        Configuracion config = userService.getConfigurationByID(1);
        int valor = Integer.parseInt(config.getValor());
        Date now = new Date();

        for (Users user : users) {
            Bitacoras bit = userService.findBitacorasByIDUserAndAction(user.getId(), "LastLogin");
            int difSegundos = restarFechas(bit.getFecha(), now);
            if (difSegundos > (valor * 24 * 60)) {
                user.setStatus(0);
                userService.updateUsers(user);
            }
        }
    }

    public static int restarFechas(Date fechaIn, Date fechaFinal) {
        long in = fechaIn.getTime();
        long fin = fechaFinal.getTime();
        Long diff = (fin - in) / 1000;
        return diff.intValue();
    }

    //@Scheduled(initialDelay = 30000, fixedDelay = 10500)
    @Override
    public void task2() {
        ArrayList<Date> days = getFirstAndLastDayFromLastMonth(new Date());
        Date fromDate = days.get(0), toDate = days.get(1);
        if (transservice.checkMonthIsCalculated(fromDate)) {
            return;
        } else {
            ArrayList<Date> tempDays = null;
            Date firstTransactionDate = transservice.getFirstTransaction();

            while (transservice.checkMonthIsCalculated(fromDate) == false && (firstTransactionDate.before(fromDate) || firstTransactionDate.equals(fromDate))) {
                insertCalculesForMonth(fromDate, toDate);
                tempDays = getFirstAndLastDayFromLastMonth(fromDate);
                fromDate = tempDays.get(0);
                toDate = tempDays.get(1);
            }
        }
    }

    @Override
    public ArrayList<Integer> GetArrayByCodeAndDate(String code, Date fromDate, Date toDate) {
        ArrayList<Integer> arrayByCode = new ArrayList();
        Iterator dateAndCant = transservice.getCantFechaByCode(code, fromDate, toDate);

        while (dateAndCant.hasNext()) {
            arrayByCode.add(((BigInteger) ((Object[]) dateAndCant.next())[1]).intValue());
        }
        return arrayByCode;
    }

    @Override
    public ArrayList<Date> getFirstAndLastDayFromLastMonth(Date date) {
        ArrayList<Date> days = new ArrayList();

        Calendar aCalendar = Calendar.getInstance();
        aCalendar.setTime(date);
        // add -1 month to current month
        aCalendar.add(Calendar.MONTH, -1);
        // set DATE to 1, so first date of previous month
        aCalendar.set(Calendar.DATE, 1);

        days.add(aCalendar.getTime());

        // set actual maximum date of previous month
        aCalendar.add(Calendar.MONTH, 1);
        //aCalendar.set(Calendar.DATE, aCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        //read it
        days.add(aCalendar.getTime());

        return days;
    }

    @Override
    public void insertCalculesForMonth(Date fromDate, Date toDate) {
        List<String> codigos = transservice.getCodigo();
        ArrayList<Integer> array = null;
        for (String code : codigos) {
            array = GetArrayByCodeAndDate(code, fromDate, toDate);
            System.out.println("******************** Array" + array.toString());
            if (array.size() > 0) {
                CalculoEstadistico calculo = new CalculoEstadistico(array);
                Estadistico estadistico = new Estadistico(calculo.valorMedio(), calculo.desviacionMedia(), fromDate);
                Integer id = transservice.addEstadistico(estadistico);

//                LOG.info("iddddddddd" + id);
//                LOG.info("arrayyyyyyyy" + array);
//                LOG.info("estadisticooooo" + estadistico.getCodigoRespuesta() + "desviacion " + estadistico.getDesviacion());
//
//                LOG.info("desviacionnnnnnnnnn" + calculo.desviacionMedia());
//                LOG.info("mediaaaaaaaaaaaaaaaa" + calculo.valorMedio());
            }
        }
    }

}
