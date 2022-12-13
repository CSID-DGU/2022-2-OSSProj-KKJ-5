package com.url.OSSProj.exception;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(String email){
        super(email + " NotFoundException!");
    }
}
