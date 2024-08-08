package com.app.store.enums;

public enum ProductStatus {

    ACTIVE("ACTIVE"),
    OUT_OF_STOCK("OUT_OF_STOCK"),
    PENDING("PENDING"),
    COMING_SOON("COMING_SOON");
    String value;

    ProductStatus(String value) {
        this.value =value;
    }
}
