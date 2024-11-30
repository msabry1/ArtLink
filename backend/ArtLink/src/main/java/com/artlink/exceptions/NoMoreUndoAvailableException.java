package com.artlink.exceptions;

public class NoMoreUndoAvailableException extends RuntimeException {
    public NoMoreUndoAvailableException(String message) {
        super(message);
    }
}