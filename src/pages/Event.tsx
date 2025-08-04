import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Spring Fashion Show 2024",
    description: "Experience the latest spring collection on the runway with top models and designers.",
    date: "2024-04-15",
    time: "19:00",
    location: "Fashion Center, New York",
    category: "Fashion Show",
    image: "/src/assets/hero-fashion.jpg",
    attendees: 250,
    maxAttendees: 300,
    price: 75,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Sustainable Fashion Workshop",
    description: "Learn about eco-friendly fashion choices and sustainable styling techniques.",
    date: "2024-03-28",
    time: "14:00",
    location: "Design Studio, Los Angeles",
    category: "Workshop",
    image: "/src/assets/product-dress-1.jpg",
    attendees: 45,
    maxAttendees: 50,
    price: 35,
    status: "upcoming"
  },
  {
    id: 3,
    title: "VIP Shopping Night",
    description: "Exclusive shopping event with personal styling consultations and special discounts.",
    date: "2024-04-20",
    time: "18:00",
    location: "Flagship Store, Chicago",
    category: "Shopping Event",
    image: "/src/assets/product-blouse-1.jpg",
    attendees: 80,
    maxAttendees: 100,
    price: 0,
    status: "upcoming"
  },
  {
    id: 4,
    title: "Designer Meet & Greet",
    description: "Meet our featured designers and learn about their creative process and inspiration.",
    date: "2024-05-10",
    time: "16:00",
    location: "Boutique Gallery, Miami",
    category: "Meet & Greet",
    image: "/src/assets/product-coat-1.jpg",
    attendees: 120,
    maxAttendees: 150,
    price: 25,
    status: "upcoming"
  },
  {
    id: 5,
    title: "Winter Collection Launch",
    description: "Be the first to see our new winter collection with exclusive preview access.",
    date: "2024-02-15",
    time: "17:30",
    location: "Fashion Week Venue, New York",
    category: "Product Launch",
    image: "/src/assets/hero-fashion.jpg",
    attendees: 300,
    maxAttendees: 300,
    price: 50,
    status: "completed"
  },
  {
    id: 6,
    title: "Styling Masterclass",
    description: "Advanced styling techniques with celebrity stylist Sarah Johnson.",
    date: "2024-06-05",
    time: "10:00",
    location: "Creative Space, San Francisco",
    category: "Masterclass",
    image: "/src/assets/product-dress-1.jpg",
    attendees: 15,
    maxAttendees: 25,
    price: 150,
    status: "upcoming"
  }
];

const Event = () => {
  const [filter, setFilter] = React.useState("All");
  const categories = ["All", ...new Set(events.map(e => e.category))];

  const filteredEvents = filter === "All" 
    ? events 
    : events.filter(e => e.category === filter);

  const upcomingEvents = filteredEvents.filter(e => e.status === "upcoming");
  const completedEvents = filteredEvents.filter(e => e.status === "completed");

  const isEventSoon = (date: string) => {
    const eventDate = new Date(date);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const isSoldOut = (attendees: number, maxAttendees: number) => {
    return attendees >= maxAttendees;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Fashion Events</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for exclusive fashion events, workshops, and shows
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="group hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                {isEventSoon(event.date) && (
                  <Badge className="absolute top-4 right-4 z-10 bg-orange-500">
                    Soon
                  </Badge>
                )}
                {isSoldOut(event.attendees, event.maxAttendees) && (
                  <Badge className="absolute top-4 right-4 z-10" variant="destructive">
                    Sold Out
                  </Badge>
                )}
                
                <div className="aspect-video overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{event.category}</Badge>
                    <div className="text-right">
                      {event.price > 0 ? (
                        <span className="text-lg font-bold text-primary">${event.price}</span>
                      ) : (
                        <span className="text-lg font-bold text-green-600">Free</span>
                      )}
                    </div>
                  </div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {/* Event Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{event.attendees}/{event.maxAttendees} attending</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        disabled={isSoldOut(event.attendees, event.maxAttendees)}
                      >
                        {isSoldOut(event.attendees, event.maxAttendees) ? 'Sold Out' : 'Register Now'}
                      </Button>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Events */}
        {completedEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedEvents.map((event) => (
                <Card key={event.id} className="opacity-75">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{event.category}</Badge>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <CardTitle className="text-muted-foreground">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{event.attendees} attended</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Event Benefits */}
        <div className="bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Why Attend Our Events?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Network</h3>
              <p className="text-muted-foreground">
                Connect with fashion enthusiasts and industry professionals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Learn</h3>
              <p className="text-muted-foreground">
                Gain insights from experts and discover new trends
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Experience</h3>
              <p className="text-muted-foreground">
                Enjoy exclusive access to collections and special offers
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Event;