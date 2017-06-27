/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.services;

import com.mkyong.web.model.Bitacoras;
import com.mkyong.web.model.Configuracion;
import com.mkyong.web.model.Estadistico;
import com.mkyong.web.model.PrsaRejectedTxn;
import com.mkyong.web.model.Users;
import com.mkyong.web.model.txn_json;
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
@Service
public class ScheduledTasks {

    private static final Logger LOG = Logger.getLogger(ScheduledTasks.class);

    @Autowired
    private UserService userService;

    @Scheduled(initialDelay = 30000, fixedDelay = 10500)
    public void task1() {
        List<Users> users = userService.findAll();
        Configuracion config = userService.getConfigurationByID(1);
        int valor = Integer.parseInt(config.getValor());
        Date now = new Date();
      
        for (Users user : users) {
            Bitacoras bit = userService.findBitacorasByIDUserAndAction(user.getId(), "LastLogin");
            int difSegundos = restarFechas(bit.getFecha(), now);
            if (difSegundos > (valor * 24 * 60)) {
          
            }
        }
    }

    public static int restarFechas(Date fechaIn, Date fechaFinal) {
        long in = fechaIn.getTime();
        long fin = fechaFinal.getTime();
        Long diff = (fin - in) / 1000;
        return diff.intValue();
    }

}
