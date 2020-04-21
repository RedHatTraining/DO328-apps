package com.redhat.training.serviceb;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/")
@ApplicationScoped
public class ServiceB {

    String message = "Hello from ServiceB!";

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String sayHello() {
        return message;
    }
}