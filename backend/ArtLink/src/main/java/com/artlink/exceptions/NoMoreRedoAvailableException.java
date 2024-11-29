package com.artlink.exceptions;

public class NoMoreRedoAvailableException extends RuntimeException {
    public NoMoreRedoAvailableException(String message) {
        super(message);
    }
}