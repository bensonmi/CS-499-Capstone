```mermaid
classDiagram
    class TripInfo {
        <<base>>
        start date
        return date
        origin location
        destination location
    }
    class CruiseInfo {
        <<subclass>>
        name
        price
        specific attributes for cruises
    }
    class FlightInfo {
        <<subclass>>
        name
        price
        specific attributes for flights
    }
    class HotelInfo {
        <<subclass>>
        name
        price
        specific attributes for hotels
    }
    class Itinerary {
        <<base>>
    }
    class CruiseBooking {
        <<base>>
        methods to book
    }
    class FlightBooking {
        <<base>>
        methods to book
    }
    class HotelBooking {
        <<base>>
        methods to book
    }
    class TravelerInfo {
        <<base>>
        number of traveler companions
    }
    class MemberAccount {
        <<base>>
    }
    class MembershipAdmin {
        <<base>>
    }
    class TravelAgent {
        <<base>>
        methods to access and book
    }

    TripInfo <|-- CruiseInfo
    TripInfo <|-- FlightInfo
    TripInfo <|-- HotelInfo
    Itinerary *-- CruiseInfo
    Itinerary *-- FlightInfo
    Itinerary *-- HotelInfo
    CruiseBooking --> CruiseInfo
    FlightBooking --> FlightInfo
    HotelBooking --> HotelInfo
    TravelerInfo <|-- MemberAccount
    MembershipAdmin <-- MemberAccount
    TravelAgent --> CruiseInfo
    TravelAgent --> FlightInfo
    TravelAgent --> HotelInfo
    TravelAgent --> TravelerInfo
    TravelAgent --> MembershipAdmin
    MembershipAdmin --* MemberAccount

