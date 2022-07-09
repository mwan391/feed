import React from 'react';
import MediaCard from './Card';
function CardGrid() {
  return (
    <div class="container mx-auto px-12 mt-8">
      <div class="flex flex-wrap -mx-1 lg:-mx-4 justify-between px-20">
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
      </div>
    </div>
  );
}

export default CardGrid;
