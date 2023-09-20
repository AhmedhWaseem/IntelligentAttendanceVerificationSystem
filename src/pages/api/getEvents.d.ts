//  exports of getEvents.js
export interface EventRecord {
    timestamp: datetime;  
    studentId: text;
    result: boolean;
  }
  
  export function exportEventsJs(): Promise<Array<EventRecord>>;
  