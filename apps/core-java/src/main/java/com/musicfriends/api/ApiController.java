package com.musicfriends.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;

@RestController
public class ApiController {

    @GetMapping("/health")
    public Object health() {
        return java.util.Map.of(
                "ok", true,
                "backend", "java",
                "time", OffsetDateTime.now().toString()
        );
    }

    @GetMapping("/now/{friendId}")
    public NowPlaying now(@PathVariable String friendId) {
        var now = OffsetDateTime.now().toString();
        return new NowPlaying(
                friendId,
                "SICKO MODE",
                "Travis Scott",
                "ASTROWORLD",
                "https://via.placeholder.com/128",
                "demo",
                now,
                15,
                false,
                now
        );
    }
}
