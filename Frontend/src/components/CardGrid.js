import React from 'react';
import MediaCard from './Card';
import eventsService from '../services/events';

function CardGrid() {
  const [events, setEvents] = React.useState([]);

  React.useEffect(
    () => async () => {
      const allEvents = await eventsService.getAll();
      setEvents(allEvents);
    },
    []
  );

  console.log(events);

  return (
    <div class="container mx-auto px-12 mt-8">
      <div class="flex flex-wrap -mx-1 lg:-mx-4 justify-between px-20">
        {events.map((currentEvent) => (
          <MediaCard currentEvent={currentEvent} />
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
