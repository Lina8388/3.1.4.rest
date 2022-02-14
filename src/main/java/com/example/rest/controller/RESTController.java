package com.example.rest.controller;

import com.example.rest.dao.UserDao;
import com.example.rest.model.User;
import com.example.rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
public class RESTController {

    private UserService userService;
    private UserDao userDao;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }



 /*   @GetMapping("/admin")
    public ResponseEntity<List<User>> apiGetAllUsers() {
        List<User> users = userService.getListUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }*/

 @GetMapping("admin")
 public ResponseEntity<List<User>> getListUsers() {
     return new ResponseEntity<>(userService.getListUsers(), HttpStatus.OK);
    }


    @GetMapping("admin/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }



    @PostMapping("admin")
    public ResponseEntity<User>  addUser(@RequestBody  User user) {
         userService.add(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }




    @PutMapping(value = "admin/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody  User user) {
        userService.update(user, id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }



    @DeleteMapping(value = "admin/{id}")
    public void removeUser(@PathVariable Long id) {
        userService.removeUser(id);

    }

















}
