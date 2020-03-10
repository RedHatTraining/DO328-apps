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
public class CurrencyResource {

    @Inject
    @RestClient
    CurrencyService currencyService;
    ObjectMapper mapper = new ObjectMapper();

    @POST
    @Path("/historicalData")
    // TODO: validate whether currency Service serves the source/target currency
    // something like new ObjectMapper().readTree(body).get("source")
    public List<Currency> getHistoricalData(String body) {
        System.out.println("Serving:" + body);
        List<Currency> res = currencyService.getCurrencies(body);
        return currencyService.getCurrencies(body);
    }

    @POST
    @Path("/singleCurrency")
    // TODO: validate whether currency Service serves the source/target currency
    public Currency getExchangeRate(String body) {
        List<Currency> currencies = currencyService.getCurrencies(body);
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