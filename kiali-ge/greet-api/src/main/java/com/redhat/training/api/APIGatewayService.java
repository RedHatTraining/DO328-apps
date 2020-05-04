package com.redhat.training.api;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.inject.Inject;

import org.eclipse.microprofile.rest.client.inject.RestClient;

@Path("/")
@ApplicationScoped
public class APIGatewayService {

    @Inject
    @RestClient
    EnglishService englishService;

    @Inject
    @RestClient
    SpanishService spanishService;

    @Inject
    @RestClient
    CzechService czechService;

    // pseudo parallel greeting. API gateway calls czech, english and spanish in that order.
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String greet() {
        
        return czechService.sayAhoj() 
        + " | " + englishService.sayHello()
        + " | " + spanishService.sayHola() + "\n";
    }

    // chained greeting call english -> spanish -> czech
    // single entry point for path - i.e english
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/chained")
    public String chainedGreeting() {
        
        return englishService.chainedGreeting() + "\n";
    }
}