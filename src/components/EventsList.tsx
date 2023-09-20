import React from 'react';

type Event = {
  id: number;
  timeStamp: string;
  studentId: string;
  result: number;
  imagePath?: string;
};

type EventsListProps = {
  eventsList: Event[];
};

const EventsList: React.FC<EventsListProps> = ({ eventsList }) => {
  return (
    <div>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr className="rounded-lg border p-2 bg-gray-800 text-sm font-medium text-white text-left">
            <th className="px-4 py-2 border p-2">Row ID</th>
            <th className="px-4 py-2 border p-2">Date & Time</th>
            <th className="px-4 py-2 border p-2">Student ID</th>
            <th className="px-4 py-2 border p-2">Status</th>
            <th className="px-4 py-2 border p-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {eventsList.map((event) => (
            <tr key={event.id} className="hover:bg-gray-800 border-b border-gray-200">
              <td className="border p-2">{event.id}</td>
              <td className="border p-2">{event.timeStamp}</td>
              <td className="border p-2">{event.studentId}</td>
              <td className="border p-2">{event.result === 0 ? 'Fail' : 'Pass'}</td>
              <td className="border p-2">{event.imagePath}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsList;
