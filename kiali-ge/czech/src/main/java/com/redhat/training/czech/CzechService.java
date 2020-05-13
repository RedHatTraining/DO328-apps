package com.redhat.training.czech;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/")
@ApplicationScoped
public class CzechService {

    String message = "Ahoj světe!";

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String sayAhoj() {
        
        return message;
    }
}