package com.mkyong.web.model;
// Generated 27/06/2017 05:46:13 PM by Hibernate Tools 4.3.1


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
 * Bitacoras generated by hbm2java
 */
@Entity
@Table(name="bitacoras"
    ,catalog="monitoreo"
)
public class Bitacoras  implements java.io.Serializable {


     private Integer idB;
     private Users users;
     private Date fecha;
     private String accion;
     private String descripcion;

    public Bitacoras() {
    }

    public Bitacoras(Users users, Date fecha, String accion, String descripcion) {
       this.users = users;
       this.fecha = fecha;
       this.accion = accion;
       this.descripcion = descripcion;
    }
   
     @Id @GeneratedValue(strategy=IDENTITY)

    
    @Column(name="idB", nullable=false)
    public Integer getIdB() {
        return this.idB;
    }
    
    public void setIdB(Integer idB) {
        this.idB = idB;
    }

@ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="userID", nullable=false)
    public Users getUsers() {
        return this.users;
    }
    
    public void setUsers(Users users) {
        this.users = users;
    }

    @Temporal(TemporalType.DATE)
    @Column(name="fecha", nullable=false, length=10)
    public Date getFecha() {
        return this.fecha;
    }
    
    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    
    @Column(name="accion", nullable=false, length=20)
    public String getAccion() {
        return this.accion;
    }
    
    public void setAccion(String accion) {
        this.accion = accion;
    }

    
    @Column(name="descripcion", nullable=false, length=20)
    public String getDescripcion() {
        return this.descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }




}


