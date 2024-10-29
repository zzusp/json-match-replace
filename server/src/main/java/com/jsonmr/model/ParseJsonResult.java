package com.jsonmr.model;

import java.util.List;

public class ParseJsonResult {

    private String json;
    List<Field> fields;

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public List<Field> getFields() {
        return fields;
    }

    public void setFields(List<Field> fields) {
        this.fields = fields;
    }
}
