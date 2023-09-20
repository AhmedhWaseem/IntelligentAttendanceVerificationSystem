// Dashboard.tsx

import React, { useEffect, useState } from "react";
import NavBar from '../components/NavBar';
import EventsList from '../components/EventsList';

interface Event {
  id: number;
  timeStamp: string;
  studentId: string;
  result: number;
  imagePath?: string;
}

interface Student {
  id: number;
  studentId: string;
  imagePath: string;
}

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEventsAndStudents() {
      try {
        const [eventsResponse, studentsResponse] = await Promise.all([
          fetch('/api/getEvents'),
          fetch('/api/getStudents')
        ]);

        const eventsData: Event[] = await eventsResponse.json();
        const studentsData: Student[] = await studentsResponse.json();

        const studentIdToImagePath: { [key: string]: string } = {};

        studentsData.forEach(student => {
          studentIdToImagePath[student.studentId] = student.imagePath;
        });

        const enrichedEvents = eventsData.map(event => ({
          ...event,
          imagePath: studentIdToImagePath[event.studentId]
        }));

        setEvents(enrichedEvents);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchEventsAndStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <NavBar />
  
      <div className="container mx-auto p-8 text-white">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
       
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && <EventsList eventsList={events} />}
      </div>
    </div>
  );
};

export default Dashboard;
