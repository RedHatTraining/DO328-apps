package com.redhat.training.payment;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@RegisterRestClient
public interface PaymentGatewayService {

    @Path("/processPayment/{amount}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String processPayment(@PathParam("amount") String amount);

}
