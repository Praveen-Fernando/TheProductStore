package com.app.store.enums;

public enum Gender {

    MALE("MALE"),
    FEMALE("FEMALE"),
    OTHER("OTHER");

    String value;

    Gender(String value) {
        this.value =value;
    }
}
