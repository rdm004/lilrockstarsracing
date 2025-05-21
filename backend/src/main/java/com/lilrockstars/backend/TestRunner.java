package com.lilrockstars.backend;

import com.lilrockstars.backend.controllers.*;
import com.lilrockstars.backend.dto.*;
import com.lilrockstars.backend.entities.*;
import com.lilrockstars.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Scanner;


public class TestRunner {

    @Autowired
    private PersonRepository personRepo;

    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(TestRunner.class, args);
        TestRunner runner = ctx.getBean(TestRunner.class);
        runner.run(ctx);
    }

    private Person ensureParentExists(String email) {
        return personRepo.findByEmail(email).orElseGet(() -> {
            Person p = new Person();
            p.setEmail(email);
            p.setFirstName("Mock");
            p.setLastName("Parent");
            p.setPassword("test123");
            p.setRole(Role.PARENT);
            return personRepo.save(p);
        });
    }

    private void run(ApplicationContext ctx) {
        Scanner scanner = new Scanner(System.in);

        EventController eventController = ctx.getBean(EventController.class);
        RacerController racerController = ctx.getBean(RacerController.class);
        RegistrationController registrationController = ctx.getBean(RegistrationController.class);

        // Ensure the test parent exists and fetch authentication
        Person mockParent = ensureParentExists("parent@example.com");
        Authentication mockAuth = new UsernamePasswordAuthenticationToken(mockParent.getEmail(), null);
        while (true) {
            System.out.println("\n==== \ud83d\ude80 Capstone Test Console ====");
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

            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1 -> createEvent(scanner, eventController);
                case 2 -> createRacer(scanner, racerController, mockAuth);
                case 3 -> registerRacer(scanner, registrationController, mockAuth);
                case 4 -> viewEvents(eventController);
                case 5 -> viewRacers(racerController, mockAuth);
                case 6 -> viewRegistrations(registrationController, mockAuth);
                case 7 -> approveRegistration(scanner, registrationController);
                case 0 -> {
                    System.out.println("Goodbye!");
                    return;
                }
                default -> System.out.println("Invalid option.");
            }
        }
    }

    private void createEvent(Scanner scanner, EventController controller) {
        System.out.print("Enter event title: ");
        String title = scanner.nextLine();
        System.out.print("Enter event date (yyyy-mm-dd): ");
        LocalDate date = LocalDate.parse(scanner.nextLine());
        System.out.print("Enter location: ");
        String location = scanner.nextLine();

        Event event = new Event();
        event.setName(title);
        LocalDateTime dateTime = date.atStartOfDay();
        event.setDate(dateTime);
        event.setLocation(location);

        Event created = controller.create(event).getBody();
        if (created != null)
            System.out.println("\u2705 Event created: ID=" + created.getEventId());
        else
            System.out.println("\u274c Event creation failed.");
    }

    private void createRacer(Scanner scanner, RacerController controller, Authentication auth) {
        System.out.print("First name: ");
        String first = scanner.nextLine();
        System.out.print("Last name: ");
        String last = scanner.nextLine();
        System.out.print("Age: ");
        int age = Integer.parseInt(scanner.nextLine());

        CreateRacerRequest req = new CreateRacerRequest();
        req.setFirstName(first);
        req.setLastName(last);
        req.setAge(age);

        RacerDTO dto = controller.create(req, auth).getBody();
        if (dto != null)
            System.out.println("\u2705 Racer created: ID=" + dto.getRacerId());
        else
            System.out.println("\u274c Racer creation failed.");
    }

    private void registerRacer(Scanner scanner, RegistrationController controller, Authentication auth) {
        System.out.print("Racer ID: ");
        long racerId = Long.parseLong(scanner.nextLine());
        System.out.print("Event ID: ");
        long eventId = Long.parseLong(scanner.nextLine());

        CreateRegistrationRequest req = new CreateRegistrationRequest();
        req.setRacerId(racerId);
        req.setEventId(eventId);

        EventRegistrationDTO dto = controller.signUp(req, auth).getBody();
        if (dto != null)
            System.out.println("\u2705 Registered racer to event.");
        else
            System.out.println("\u274c Registration failed.");
    }

    private void viewEvents(EventController controller) {
        List<Event> events = controller.getAll().getBody();
        System.out.println("\n-- Events --");
        for (Event e : events)
            System.out.println("ID: " + e.getEventId() + " | " + e.getName() + " @ " + e.getLocation());
    }

    private void viewRacers(RacerController controller, Authentication auth) {
        List<RacerDTO> racers = controller.myRacers(auth).getBody();
        System.out.println("\n-- Racers --");
        for (RacerDTO r : racers)
            System.out.println("ID: " + r.getRacerId() + " | " + r.getFirstName() + " " + r.getLastName() + " | Age: " + r.getAge());
    }

    private void viewRegistrations(RegistrationController controller, Authentication auth) {
        List<EventRegistrationDTO> regs = controller.myRegs(auth).getBody();
        System.out.println("\n-- Registrations --");
        for (EventRegistrationDTO r : regs)
            System.out.println("Reg ID: " + r.getRegistrationId() + " | Event: " + r.getEventName() + " | Racer: " + r.getRacerName() + " | Status: " + r.getStatus());
    }

    private void approveRegistration(Scanner scanner, RegistrationController controller) {
        System.out.print("Enter registration ID to approve: ");
        long id = Long.parseLong(scanner.nextLine());
        controller.approve(id);
        System.out.println("\u2705 Approved registration #" + id);
    }
}
