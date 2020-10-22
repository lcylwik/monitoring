/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mkyong.web.model;

import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author lianet
 */
public class FilterTxn {

    private ArrayList<Integer> id;
    private ArrayList<String> prtFilename;
    private ArrayList<Date> prtProcDte;
    private ArrayList<String> fiidAdquiriente;
    private ArrayList<String> fiidEmisor;
    private ArrayList<String> redLogicaEmi;
    private ArrayList<String> codigoRespuesta;
    private ArrayList<String> producto;
    private ArrayList<String> ambiente;
    private ArrayList<Integer> tipoTransaccion;
    private ArrayList<Integer> tipoMensaje;
    private ArrayList<String> tipoTerminal;
    private ArrayList<Integer> tipoCuenta;
    private ArrayList<String> responder;
    private ArrayList<String> redLogicaAdq;
    private ArrayList<String> entryMode;
    private ArrayList<Integer> medioAcceso;
    private ArrayList<String> tokenB4;
    private ArrayList<String> tokenB0;

    public FilterTxn() {
    }

    public FilterTxn(ArrayList<Integer> id, ArrayList<String> prtFilename, ArrayList<Date> prtProcDte, ArrayList<String> fiidAdquiriente, ArrayList<String> fiidEmisor, ArrayList<String> redLogicaEmi, ArrayList<String> codigoRespuesta, ArrayList<String> producto, ArrayList<String> ambiente, ArrayList<Integer> tipoTransaccion, ArrayList<Integer> tipoMensaje, ArrayList<String> tipoTerminal, ArrayList<Integer> tipoCuenta, ArrayList<String> responder, ArrayList<String> redLogicaAdq, ArrayList<String> entryMode, ArrayList<Integer> medioAcceso, ArrayList<String> tokenB4, ArrayList<String> tokenB0) {
        this.id = id;
        this.prtFilename = prtFilename;
        this.prtProcDte = prtProcDte;
        this.fiidAdquiriente = fiidAdquiriente;
        this.fiidEmisor = fiidEmisor;
        this.redLogicaEmi = redLogicaEmi;
        this.codigoRespuesta = codigoRespuesta;
        this.producto = producto;
        this.ambiente = ambiente;
        this.tipoTransaccion = tipoTransaccion;
        this.tipoMensaje = tipoMensaje;
        this.tipoTerminal = tipoTerminal;
        this.tipoCuenta = tipoCuenta;
        this.responder = responder;
        this.redLogicaAdq = redLogicaAdq;
        this.entryMode = entryMode;
        this.medioAcceso = medioAcceso;
        this.tokenB4 = tokenB4;
        this.tokenB0 = tokenB0;
    }

    public void setId(ArrayList<Integer> id) {
        this.id = id;
    }

    public void setPrtFilename(ArrayList<String> prtFilename) {
        this.prtFilename = prtFilename;
    }

    public void setPrtProcDte(ArrayList<Date> prtProcDte) {
        this.prtProcDte = prtProcDte;
    }

    public void setFiidAdquiriente(ArrayList<String> fiidAdquiriente) {
        this.fiidAdquiriente = fiidAdquiriente;
    }

    public void setFiidEmisor(ArrayList<String> fiidEmisor) {
        this.fiidEmisor = fiidEmisor;
    }

    public void setRedLogicaEmi(ArrayList<String> redLogicaEmi) {
        this.redLogicaEmi = redLogicaEmi;
    }

    public void setCodigoRespuesta(ArrayList<String> codigoRespuesta) {
        this.codigoRespuesta = codigoRespuesta;
    }

    public void setProducto(ArrayList<String> producto) {
        this.producto = producto;
    }

    public void setAmbiente(ArrayList<String> ambiente) {
        this.ambiente = ambiente;
    }

    public void setTipoTransaccion(ArrayList<Integer> tipoTransaccion) {
        this.tipoTransaccion = tipoTransaccion;
    }

    public void setTipoMensaje(ArrayList<Integer> tipoMensaje) {
        this.tipoMensaje = tipoMensaje;
    }

    public void setTipoTerminal(ArrayList<String> tipoTerminal) {
        this.tipoTerminal = tipoTerminal;
    }

    public void setTipoCuenta(ArrayList<Integer> tipoCuenta) {
        this.tipoCuenta = tipoCuenta;
    }

    public void setResponder(ArrayList<String> responder) {
        this.responder = responder;
    }

    public void setRedLogicaAdq(ArrayList<String> redLogicaAdq) {
        this.redLogicaAdq = redLogicaAdq;
    }

    public void setEntryMode(ArrayList<String> entryMode) {
        this.entryMode = entryMode;
    }

    public void setMedioAcceso(ArrayList<Integer> medioAcceso) {
        this.medioAcceso = medioAcceso;
    }

    public void setTokenB4(ArrayList<String> tokenB4) {
        this.tokenB4 = tokenB4;
    }

    public void setTokenB0(ArrayList<String> tokenB0) {
        this.tokenB0 = tokenB0;
    }

    public ArrayList<Integer> getId() {
        return id;
    }

    public ArrayList<String> getPrtFilename() {
        return prtFilename;
    }

    public ArrayList<Date> getPrtProcDte() {
        return prtProcDte;
    }

    public ArrayList<String> getFiidAdquiriente() {
        return fiidAdquiriente;
    }

    public ArrayList<String> getFiidEmisor() {
        return fiidEmisor;
    }

    public ArrayList<String> getRedLogicaEmi() {
        return redLogicaEmi;
    }

    public ArrayList<String> getCodigoRespuesta() {
        return codigoRespuesta;
    }

    public ArrayList<String> getProducto() {
        return producto;
    }

    public ArrayList<String> getAmbiente() {
        return ambiente;
    }

    public ArrayList<Integer> getTipoTransaccion() {
        return tipoTransaccion;
    }

    public ArrayList<Integer> getTipoMensaje() {
        return tipoMensaje;
    }

    public ArrayList<String> getTipoTerminal() {
        return tipoTerminal;
    }

    public ArrayList<Integer> getTipoCuenta() {
        return tipoCuenta;
    }

    public ArrayList<String> getResponder() {
        return responder;
    }

    public ArrayList<String> getRedLogicaAdq() {
        return redLogicaAdq;
    }

    public ArrayList<String> getEntryMode() {
        return entryMode;
    }

    public ArrayList<Integer> getMedioAcceso() {
        return medioAcceso;
    }

    public ArrayList<String> getTokenB4() {
        return tokenB4;
    }

    public ArrayList<String> getTokenB0() {
        return tokenB0;
    }

}
