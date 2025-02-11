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
@Service
public interface ScheduledTasks {
    
    void task1();
    void task2();
    ArrayList<Integer> GetArrayByCodeAndDate(String code, Date fromDate, Date toDate);
    ArrayList<Date> getFirstAndLastDayFromLastMonth(Date date);
    void insertCalculesForMonth(Date fromDate, Date toDate);
}