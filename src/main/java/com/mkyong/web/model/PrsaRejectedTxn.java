package com.mkyong.web.model;
// Generated 28/06/2017 12:38:49 PM by Hibernate Tools 4.3.1


import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * PrsaRejectedTxn generated by hbm2java
 */
@Entity
@Table(name="prsa_rejected_txn"
    ,catalog="transacciones"
)
public class PrsaRejectedTxn  implements java.io.Serializable {


     private int id;
     private String prtFilename;
     private Date prtProcDte;
     private int numeroPrsaAdquiriente;
     private int numeroPrsaEmisor;
     private String fiidAdquiriente;
     private String fiidEmisor;
     private String redLogica;
     private String codigoRespuesta;

    public PrsaRejectedTxn() {
    }

    public PrsaRejectedTxn(int id, String prtFilename, Date prtProcDte, int numeroPrsaAdquiriente, int numeroPrsaEmisor, String fiidAdquiriente, String fiidEmisor, String redLogica, String codigoRespuesta) {
       this.id = id;
       this.prtFilename = prtFilename;
       this.prtProcDte = prtProcDte;
       this.numeroPrsaAdquiriente = numeroPrsaAdquiriente;
       this.numeroPrsaEmisor = numeroPrsaEmisor;
       this.fiidAdquiriente = fiidAdquiriente;
       this.fiidEmisor = fiidEmisor;
       this.redLogica = redLogica;
       this.codigoRespuesta = codigoRespuesta;
    }
   
     @Id 

    
    @Column(name="ID", nullable=false)
    public int getId() {
        return this.id;
    }
    
    public void setId(int id) {
        this.id = id;
    }

    
    @Column(name="PRT_FILENAME", nullable=false, length=16)
    public String getPrtFilename() {
        return this.prtFilename;
    }
    
    public void setPrtFilename(String prtFilename) {
        this.prtFilename = prtFilename;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="PRT_PROC_DTE", nullable=false, length=19)
    public Date getPrtProcDte() {
        return this.prtProcDte;
    }
    
    public void setPrtProcDte(Date prtProcDte) {
        this.prtProcDte = prtProcDte;
    }

    
    @Column(name="numero_prsa_adquiriente", nullable=false)
    public int getNumeroPrsaAdquiriente() {
        return this.numeroPrsaAdquiriente;
    }
    
    public void setNumeroPrsaAdquiriente(int numeroPrsaAdquiriente) {
        this.numeroPrsaAdquiriente = numeroPrsaAdquiriente;
    }

    
    @Column(name="numero_prsa_emisor", nullable=false)
    public int getNumeroPrsaEmisor() {
        return this.numeroPrsaEmisor;
    }
    
    public void setNumeroPrsaEmisor(int numeroPrsaEmisor) {
        this.numeroPrsaEmisor = numeroPrsaEmisor;
    }

    
    @Column(name="fiid_adquiriente", nullable=false, length=30)
    public String getFiidAdquiriente() {
        return this.fiidAdquiriente;
    }
    
    public void setFiidAdquiriente(String fiidAdquiriente) {
        this.fiidAdquiriente = fiidAdquiriente;
    }

    
    @Column(name="fiid_emisor", nullable=false, length=30)
    public String getFiidEmisor() {
        return this.fiidEmisor;
    }
    
    public void setFiidEmisor(String fiidEmisor) {
        this.fiidEmisor = fiidEmisor;
    }

    
    @Column(name="red_logica", nullable=false, length=30)
    public String getRedLogica() {
        return this.redLogica;
    }
    
    public void setRedLogica(String redLogica) {
        this.redLogica = redLogica;
    }

    
    @Column(name="codigo_respuesta", nullable=false, length=10)
    public String getCodigoRespuesta() {
        return this.codigoRespuesta;
    }
    
    public void setCodigoRespuesta(String codigoRespuesta) {
        this.codigoRespuesta = codigoRespuesta;
    }




}


