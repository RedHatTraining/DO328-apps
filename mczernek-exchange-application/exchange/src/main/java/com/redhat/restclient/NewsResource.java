package com.redhat.restclient;

import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/news")
@Produces(MediaType.APPLICATION_JSON)
public class NewsResource {

    @Inject
    @RestClient
    NewsService news;

    @GET
    public List<News> getFinancialNews() {
        return news.getFinancialNews();
    }
}
