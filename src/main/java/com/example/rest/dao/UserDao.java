package com.example.rest.dao;


import com.example.rest.model.Role;
import com.example.rest.model.User;

import java.util.List;
import java.util.Set;

public interface UserDao {

    User getUserByName(String name);

    User getUserByEmail(String email);

    User getUserById(Long id);

    List<User> getListUsers();

    void add(User user);



    User update(User user, Long id);

    void removeUser(Long id);

    Set<Role> getListRoles();

    Set<Role> getRolesByRoleNames(String[] roleNames);

    Role getRoleByName(String roleName);
}

