package com.redhat.restclient;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/exchangeRate")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ExchangeResource {

    @Inject
    @RestClient
    ExchangeService historyService;

    @Inject
    @RestClient
    NewsService newsService;

    ObjectMapper mapper = new ObjectMapper();

    @GET
    @Path("/news")
    public List<News> getFinancialNews() {
        return newsService.getFinancialNews();
    }

    @POST
    @Path("/historicalData")
    public List<Currency> getHistoricalData(String body) {
        try {
            Thread.sleep(5000);
        }
        catch(InterruptedException ie) {
            ie.printStackTrace();
        }
        
        return historyService.getCurrencyExchangeRates(body);
    }

    @POST
    @Path("/singleCurrency")
    public Currency getExchangeRate(String body) {
        List<Currency> currencies = historyService.getCurrencyExchangeRates(body);
        Currency latestCurrency = currencies.get(0);
        try {
            String target = mapper.readTree(body).get("target").asText();
            if(target.equals("USD")) {
                latestCurrency.setSign("$");
            } else {
                latestCurrency.setSign("€");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return latestCurrency;
    }

    // A simple health check of the service, as well as
    // connectivity check between the service and other services
    @GET
    public String ping() {
        return "pong";
    }
}
