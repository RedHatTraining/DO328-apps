package io.vertx.greet;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.Instant;
import java.util.logging.Logger;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;


public class GreetServer {

    private int counter;
    private float maxRequestsPerSecond;
    private String greeting;
    private Instant lastRequestInstant;
    private Vertx vertx;
    private final static Logger LOGGER = Logger.getLogger(GreetServer.class.getName());
    private static String HOSTNAME;
    static {
        try {
            HOSTNAME = InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
            HOSTNAME = "unknown";
        }
    }
  
    GreetServer(String greeting, float maxRequestsPerSecond) {
        this.greeting = greeting;
        this.maxRequestsPerSecond = maxRequestsPerSecond;
        lastRequestInstant = Instant.MIN;
        vertx = Vertx.vertx();
    }

    public void start() {
        vertx
            .createHttpServer()
            .requestHandler(defineRoutes())
            .listen(8080);
    }

    private Router defineRoutes() {
        Router router = Router.router(vertx);

        router.get("/").handler(req -> {
            Instant now = Instant.now();
            LOGGER.info("Attending greeting request #"+counter+" from "+HOSTNAME);
 
            if (isRequestWithinRateLimits(now)) {
                req.response().end(greeting + "\n");
            } else {
                req.response().setStatusCode(503).end();
            }

            lastRequestInstant = now;
            counter++;
        });

        router.get("/counter").handler(req ->
            req.response().end(counter + "\n")
        );

        return router;
    }

    private boolean isRequestWithinRateLimits(Instant instant) {
        if (maxRequestsPerSecond == 0) {
            return true;
        }

        long millis = (long) (1000 / maxRequestsPerSecond);
        return lastRequestInstant.plusMillis(millis).isBefore(instant);
    }

}