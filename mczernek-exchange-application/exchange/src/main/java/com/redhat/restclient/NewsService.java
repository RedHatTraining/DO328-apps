package com.redhat.restclient;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/")
@RegisterRestClient
public interface NewsService {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    List<News> getFinancialNews();
}
