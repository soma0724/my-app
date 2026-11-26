
package com.example.touringpractice.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TouringController {

    // ツーリング条件を受け取る
    @PostMapping("/api/touring")
    public String receiveConditions(
            @RequestBody Map<String, Object> touringConditions) {

        // 受け取った条件をコンソールに表示
        System.out.println("受け取ったツーリング条件:");
        System.out.println(touringConditions);

        // ブラウザに返すメッセージ
        return "ツーリング条件を受け取りました。";
    }
}
