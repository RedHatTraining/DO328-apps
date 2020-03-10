package com.redhat.restclient;

public class Currency {
    private String value;
    private String date;
    private String sign;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    @Override
    public String toString() {
        return "Currency{" +
                "value='" + value + '\'' +
                ", date='" + date + '\'' +
                '}';
    }
}
