package com.example.rest.service;



import com.example.rest.model.Role;
import com.example.rest.model.User;

import java.util.List;
import java.util.Set;

public interface UserService {

    List<User> getListUsers();

    User add(User user);

    User update(User user, Long id);


    void removeUser(Long id);

    User getUserById(Long id);

    User getUserByName(String name);

    Set<Role> getListRoles();

}
