package com.app.store.enums;

public enum ProductCategoryTypes {
    ELECTRONIC_ACCESSORIES("ELECTRONIC ACCESSORIES"),
    HOME_APPLIANCES("HOME APPLIANCES"),
    HEALTH_BEAUTY("HEALTH BEAUTY"),
    HOME_LIFESTYLE("HOME LIFESTYLE"),
    FASHION_ACCESSORIES("FASHION ACCESSORIES"),
    SPORTS_OUTDOOR("SPORTS OUTDOOR"),
    AUTOMOTIVE_MOTORBIKE("AUTOMOTIVE MOTORBIKE");

    String value;

    ProductCategoryTypes(String value) {
        this.value =value;
    }
}
