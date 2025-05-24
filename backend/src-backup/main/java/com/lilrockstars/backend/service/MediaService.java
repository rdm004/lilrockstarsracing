package com.lilrockstars.backend.service;

import com.lilrockstars.backend.entities.Event;
import com.lilrockstars.backend.entities.Media;
import com.lilrockstars.backend.repositories.EventRepository;
import com.lilrockstars.backend.repositories.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class MediaService {

    private final MediaRepository mediaRepo;
    private final EventRepository eventRepo;

    @Autowired
    public MediaService(MediaRepository mediaRepo,
                        EventRepository eventRepo) {
        this.mediaRepo = mediaRepo;
        this.eventRepo = eventRepo;
    }

    public Media store(MultipartFile file, Long eventId) {
        Event ev = eventRepo.findById(eventId)
                .orElseThrow();
        Media m = new Media();
        m.setFileName(file.getOriginalFilename());
        try {
            m.setData(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        m.setEvent(ev);
        return mediaRepo.save(m);
    }

    public List<Media> getByEvent(Long eventId) {
        return mediaRepo.findByEvent_EventId(eventId);
    }
}