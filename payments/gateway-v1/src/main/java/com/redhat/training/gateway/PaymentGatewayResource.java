package com.redhat.training.gateway;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.inject.Inject;

import org.jboss.logging.Logger;
import java.util.Random;

@Path("/processPayment")
@ApplicationScoped
public class PaymentGatewayResource {

    private static final Logger log = Logger.getLogger(PaymentGatewayResource.class.getName());

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("{amount}")
    public String processPayment(@PathParam("amount") String amount) {

        log.info("Processing payment for $" + amount + " through gateway-v1...");

        Integer transactionId = getRandom(1000, 10000);
        
        return transactionId.toString();
    }

    private Integer getRandom(int min, int max) {
        Random random = new Random();
        Integer number = random.nextInt((max - min) + 1) + min;

        return number;
    }
}