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

  return (
    <div className="container mx-auto px-8 xl:px-12 mt-8">
      <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-between px-10 2xl:px-20">
        {events
          .sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            if (aDate < bDate) {
              return -1;
            }
            if (aDate > bDate) {
              return 1;
            }
            return 0;
          })
          .map((currentEvent) => (
            <MediaCard currentEvent={currentEvent} key={currentEvent.id} />
          ))}
      </div>
    </div>
  );
}

export default CardGrid;
