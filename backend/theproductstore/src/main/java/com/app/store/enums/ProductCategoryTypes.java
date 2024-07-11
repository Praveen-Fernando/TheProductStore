package com.app.store.enums;

public enum ProductCategoryTypes {
    ELECTRONIC_ACCESSORIES("ELECTRONIC_ACCESSORIES"),
    HOME_APPLIANCES("HOME_APPLIANCES"),
    HEALTH_BEAUTY("HEALTH_BEAUTY"),
    HOME_LIFESTYLE("HOME_LIFESTYLE"),
    FASHION_ACCESSORIES("FASHION_ACCESSORIES"),
    SPORTS_OUTDOOR("SPORTS_OUTDOOR"),
    AUTOMOTIVE_MOTORBIKE("AUTOMOTIVE_MOTORBIKE");

    String value;

    ProductCategoryTypes(String value) {
        this.value =value;
    }
}
