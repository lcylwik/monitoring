package com.mkyong.web.model;
// Generated 28-may-2017 15:58:48 by Hibernate Tools 4.3.1


import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Estadistico generated by hbm2java
 */
@Entity
@Table(name="estadistico"
    ,catalog="transaccionesprosa"
)
public class Estadistico  implements java.io.Serializable {


     private Integer id;
     private Clave clave;
     private double media;
     private double desviacion;
     private Date fecha;

    public Estadistico() {
    }

	
    public Estadistico(double media, double desviacion, Date fecha) {
        this.media = media;
        this.desviacion = desviacion;
        this.fecha = fecha;
    }
    public Estadistico(Clave clave, double media, double desviacion, Date fecha) {
       this.clave = clave;
       this.media = media;
       this.desviacion = desviacion;
       this.fecha = fecha;
    }
   
     @Id @GeneratedValue(strategy=IDENTITY)

    
    @Column(name="id", nullable=false)
    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

@ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="idClave")
    public Clave getClave() {
        return this.clave;
    }
    
    public void setClave(Clave clave) {
        this.clave = clave;
    }

    
    @Column(name="media", nullable=false, precision=22, scale=0)
    public double getMedia() {
        return this.media;
    }
    
    public void setMedia(double media) {
        this.media = media;
    }

    
    @Column(name="desviacion", nullable=false, precision=22, scale=0)
    public double getDesviacion() {
        return this.desviacion;
    }
    
    public void setDesviacion(double desviacion) {
        this.desviacion = desviacion;
    }

    @Temporal(TemporalType.DATE)
    @Column(name="fecha", nullable=false, length=10)
    public Date getFecha() {
        return this.fecha;
    }
    
    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }




}


