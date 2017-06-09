package com.mkyong.web.model;
// Generated 8/06/2017 06:20:27 PM by Hibernate Tools 4.3.1


import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

/**
 * Permissions generated by hbm2java
 */
@Entity
@Table(name="permissions"
    ,catalog="monitoreo"
    , uniqueConstraints = @UniqueConstraint(columnNames="name") 
)
public class Permissions  implements java.io.Serializable {


     private Integer id;
     private String name;
     private String displayName;
     private String description;
     private Date createdAt;
     private Date updatedAt;
     private Set<Roles> roleses = new HashSet<Roles>(0);

    public Permissions() {
    }

	
    public Permissions(String name, String displayName) {
        this.name = name;
        this.displayName = displayName;
    }
    public Permissions(String name, String displayName, String description, Date createdAt, Date updatedAt, Set<Roles> roleses) {
       this.name = name;
       this.displayName = displayName;
       this.description = description;
       this.createdAt = createdAt;
       this.updatedAt = updatedAt;
       this.roleses = roleses;
    }
   
     @Id @GeneratedValue(strategy=IDENTITY)

    
    @Column(name="id", unique=true, nullable=false)
    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    
    @Column(name="name", unique=true, nullable=false)
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    
    @Column(name="display_name", nullable=false)
    public String getDisplayName() {
        return this.displayName;
    }
    
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    
    @Column(name="description")
    public String getDescription() {
        return this.description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="created_at", length=19)
    public Date getCreatedAt() {
        return this.createdAt;
    }
    
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="updated_at", length=19)
    public Date getUpdatedAt() {
        return this.updatedAt;
    }
    
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name = "permission_role", catalog = "monitoreo", joinColumns = {
        @JoinColumn(name = "permission_id", nullable = false, updatable = false)}, inverseJoinColumns = {
        @JoinColumn(name = "role_id", nullable = false, updatable = false)})
    @JsonIgnore
    public Set<Roles> getRoleses() {
        return this.roleses;
    }
    
    public void setRoleses(Set<Roles> roleses) {
        this.roleses = roleses;
    }




}


