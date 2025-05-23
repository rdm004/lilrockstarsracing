package com.lilrockstars.backend;

import com.lilrockstars.backend.controllers.*;
import com.lilrockstars.backend.dto.*;
import com.lilrockstars.backend.entities.*;
import com.lilrockstars.backend.repositories.PersonRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Scanner;

@Component
public class TestRunner {

    private final EventController eventController;
    private final RacerController racerController;
    private final RegistrationController registrationController;
    private final PersonRepository personRepo;

    public TestRunner(
            EventController eventController,
            RacerController racerController,
            RegistrationController registrationController,
            PersonRepository personRepo
    ) {
        this.eventController = eventController;
        this.racerController = racerController;
        this.registrationController = registrationController;
        this.personRepo = personRepo;
    }

    @PostConstruct
    public void run() {
        Scanner scanner = new Scanner(System.in);
        Person mockParent = personRepo.findByEmail("parent@example.com").orElseGet(() -> {
            Person p = new Person();
            p.setEmail("parent@example.com");
            p.setFirstName("Test");
            p.setLastName("Parent");
            p.setPassword("test123");
            p.setRole(Role.PARENT);
            return personRepo.save(p);
        });

        Authentication auth = new UsernamePasswordAuthenticationToken(mockParent.getEmail(), null);

        while (true) {
            System.out.println("\n==== 🚀 Capstone Test Console ====");
            System.out.println("Choose an action:");
            System.out.println("[1] Create Event");
            System.out.println("[2] Create Racer");
            System.out.println("[3] Register Racer to Event");
            System.out.println("[4] View Events");
            System.out.println("[5] View Racers");
            System.out.println("[6] View Registrations");
            System.out.println("[7] Approve Registration (Admin)");
            System.out.println("[0] Exit");
            System.out.print("> ");

            switch (scanner.nextLine()) {
                case "1" -> createEvent(scanner);
                case "2" -> createRacer(scanner, auth);
                case "3" -> register(scanner, auth);
                case "4" -> viewEvents();
                case "5" -> viewRacers(auth);
                case "6" -> viewRegistrations(auth);
                case "7" -> approveRegistration(scanner);
                case "0" -> System.exit(0);
                default -> System.out.println("❌ Invalid choice.");
            }
        }
    }

    private void createEvent(Scanner s) {
        Event e = new Event();
        System.out.print("Event title: ");
        e.setName(s.nextLine());
        System.out.print("Date (yyyy-mm-dd): ");
        e.setDate(LocalDate.parse(s.nextLine()).atStartOfDay());
        System.out.print("Location: ");
        e.setLocation(s.nextLine());
        var res = eventController.create(e).getBody();
        System.out.println("✅ Created: ID=" + res.getEventId());
    }

    private void createRacer(Scanner s, Authentication auth) {
        CreateRacerRequest r = new CreateRacerRequest();
        System.out.print("First: "); r.setFirstName(s.nextLine());
        System.out.print("Last: "); r.setLastName(s.nextLine());
        System.out.print("Age: "); r.setAge(Integer.parseInt(s.nextLine()));
        var dto = racerController.create(r, auth).getBody();
        System.out.println("✅ Racer created: ID=" + dto.getRacerId());
    }

    private void register(Scanner s, Authentication auth) {
        CreateRegistrationRequest r = new CreateRegistrationRequest();
        System.out.print("Racer ID: "); r.setRacerId(Long.parseLong(s.nextLine()));
        System.out.print("Event ID: "); r.setEventId(Long.parseLong(s.nextLine()));
        var dto = registrationController.signUp(r, auth).getBody();
        System.out.println("✅ Registered racer to event.");
    }

    private void viewEvents() {
        List<Event> events = eventController.getAll().getBody();
        System.out.println("\n-- Events --");
        for (Event e : events)
            System.out.printf("ID: %d | %s | %s | %s\n", e.getEventId(), e.getName(), e.getLocation(), e.getDate());
    }

    private void viewRacers(Authentication auth) {
        List<RacerDTO> racers = racerController.myRacers(auth).getBody();
        System.out.println("\n-- Racers --");
        for (RacerDTO r : racers)
            System.out.printf("ID: %d | %s %s | Age: %d\n", r.getRacerId(), r.getFirstName(), r.getLastName(), r.getAge());
    }

    private void viewRegistrations(Authentication auth) {
        List<EventRegistrationDTO> regs = registrationController.myRegs(auth).getBody();
        System.out.println("\n-- Registrations --");
        for (EventRegistrationDTO r : regs)
            System.out.printf("Reg ID: %d | Event: %s | Racer: %s | Status: %s\n",
                    r.getRegistrationId(), r.getEventName(), r.getRacerName(), r.getStatus());
    }

    private void approveRegistration(Scanner s) {
        System.out.print("Enter registration ID to approve: ");
        long id = Long.parseLong(s.nextLine());
        registrationController.approve(id);
        System.out.println("✅ Approved registration #" + id);
    }
}