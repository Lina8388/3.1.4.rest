package com.example.rest.controller;

import com.example.rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping()
public class MainController {


    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }


    @GetMapping(value = "/")
    public String getLoginPage() {
        return "login";
    }

    @GetMapping("/users")
    public String getPage(Model model, Principal principal) {

        model.addAttribute("principal", userService.getUserByName(principal.getName()).getRolesString());
        return "users";
    }


  /*  @GetMapping("admin/new")
    public String newUser(Model model,Principal principal) {


        return "new";
    }*/




}
