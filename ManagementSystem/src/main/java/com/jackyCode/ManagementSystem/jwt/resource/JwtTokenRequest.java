package com.jackyCode.ManagementSystem.jwt.resource;

import java.io.Serializable;

public class  JwtTokenRequest implements Serializable {
  
  private static final long serialVersionUID = -5616176897013108345L;

  private String username;
    private String password;
//    {
//    	"token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWNreSIsImV4cCI6MTYzMDIyNTU1NywiaWF0IjoxNjI5NjIwNzU3fQ.am3hcKGnzbFBE_hasOb518aXAlRAq5jpFKH_9cQXYV5tv_Zvdfch1AfL2rWrGgozHWl5OCIkaoxdZVNMFFysCw"
//    	}

    public JwtTokenRequest() {
        super();
    }

    public JwtTokenRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

