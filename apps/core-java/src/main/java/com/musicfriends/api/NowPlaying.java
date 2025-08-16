package com.musicfriends.api;

public record NowPlaying(
        String userId,
        String title,
        String artist,
        String album,
        String artworkUrl,
        String service,
        String startedAt,
        int positionSec,
        boolean isPaused,
        String updatedAt
) {}
