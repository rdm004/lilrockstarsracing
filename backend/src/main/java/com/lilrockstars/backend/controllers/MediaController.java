package com.lilrockstars.backend.controllers;

import com.lilrockstars.backend.entities.Media;
import com.lilrockstars.backend.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/media")
@CrossOrigin
public class MediaController {

    private final MediaService mediaService;

    @Autowired
    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Media> upload(@RequestParam("file") MultipartFile file,
                                        @RequestParam("eventId") Long eventId) {
        Media m = mediaService.store(file, eventId);
        return ResponseEntity.status(HttpStatus.CREATED).body(m);
    }

    @GetMapping("/{eventId}")
    public List<Media> listForEvent(@PathVariable Long eventId) {
        return mediaService.getByEvent(eventId);
    }

    @GetMapping("/raw/{mediaId}")
    public ResponseEntity<byte[]> getRawMedia(@PathVariable Long mediaId) {
        Media m = mediaService.getById(mediaId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // or dynamically check content type
        headers.setContentDisposition(ContentDisposition.inline().filename(m.getFileName()).build());
        return new ResponseEntity<>(m.getData(), headers, HttpStatus.OK);
    }
}