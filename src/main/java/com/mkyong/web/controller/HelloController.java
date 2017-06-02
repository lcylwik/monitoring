package com.mkyong.web.controller;

import com.mkyong.web.model.Users;
import com.mkyong.web.model.userLogin;
import com.mkyong.web.services.RolService;
import com.mkyong.web.services.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

//api rest 

@RestController
public class HelloController {
    
    @Autowired
    private UserService userservice;
    
    @Autowired
    private RolService rolservice;
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView getData() {
        System.out.println("entro al controlador");
        ModelAndView model = new ModelAndView("index.html");
        
        return model;
        
    }
    

    /**
     *
     * @param user
     * @return
     * @throws ServletException
     */
    @RequestMapping(value = "/auth/authenticate", method = RequestMethod.POST)
    public LoginResponse login(@RequestBody userLogin user)
            throws ServletException {
        if (user.getName() == null) {
            throw new ServletException("Entre el usuario");
        } else if (!userservice.userExists(user.getName())) {
            throw new ServletException("El usuario no esta en el BD");
        } else if (userservice.findUserByPass(user.getName(), user.getPassword()) == null) {
            throw new ServletException("Pass incorrecto");
        }
        System.out.println("Entro al controller loginnnnnnnnnnn");
        return new LoginResponse(Jwts.builder().setSubject(user.getName())
                .claim("roles", userservice.findRoleByUserName(user.getName())).setIssuedAt(new Date())
                .claim("user", userservice.findByName(user.getName()))
                .claim("permissions", userservice.findPermissionByUserName(user.getName()))
                .signWith(SignatureAlgorithm.HS256, "secretkey").compact());
    }
    
    @SuppressWarnings("unused")
    private static class LoginResponse {
        
        public String token;
        
        public LoginResponse(final String token) {
            this.token = token;
        }
    }
    
   
    
}

