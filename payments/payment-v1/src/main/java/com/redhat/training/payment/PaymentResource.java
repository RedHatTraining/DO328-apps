package com.redhat.training.payment;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.inject.Inject;
import org.jboss.logging.Logger;

import org.eclipse.microprofile.rest.client.inject.RestClient;

@Path("/pay")
@ApplicationScoped
public class PaymentResource {

    private static final Logger log = Logger.getLogger(PaymentResource.class.getName());

    @Inject
    @RestClient
    PaymentGatewayService gatewayService;

    String message;
    String transactionId;
    Response.Status status;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("{amount}")
    public Response acceptPayment(@PathParam("amount") String amount) {

        try {
            transactionId = gatewayService.processPayment(amount);
            log.info(transactionId);
            message = String.format("[payment-v1] OK. Transaction id is %s\n", transactionId);
            status = Response.Status.OK;
        }
        catch (Exception e) {
            log.error(e);
            message = "[payment-v1] FAIL!\n"; 
            status = Response.Status.INTERNAL_SERVER_ERROR;
        }    
        
        return Response
        .status(status)
        .entity(message)
        .build();
    }
}