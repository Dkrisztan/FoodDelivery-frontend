import React, { useEffect } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';

const MyTimeline = () => {
  const groups = new DataSet([
    { content: 'Formula E', id: 'Formula E', value: 1, className: 'green' },
    { content: 'WRC', id: 'WRC', value: 2, className: 'green' },
    { content: 'MotoGP', id: 'MotoGP', value: 3, className: 'green' },
    { content: 'V8SC', id: 'V8SC', value: 4, className: 'bg-amber-400' },
    { content: 'WTCC', id: 'WTCC', value: 5, className: 'bg-amber-400' },
    { content: 'F1', id: 'F1', value: 6, className: 'bg-amber-400' },
  ]);

  const items = new DataSet([
    {
      start: new Date(2015, 0, 10),
      end: new Date(2015, 0, 11),
      group: 'Formula E',
      className: 'bg-amber-400',
      content: '',
      id: '531@motocal.net',
    },
    {
      start: new Date(2015, 0, 22),
      end: new Date(2015, 0, 26),
      group: 'WRC',
      className: 'green',
      content: '',
      id: '591@motocal.net',
    },
    {
      start: new Date('2024-05-03T12:00:00Z'),
      end: new Date('2024-05-03T12:02:00Z'),
      group: 'MotoGP',
      className: 'bg-amber-400',
      content: '',
      id: '578@motocal.net',
    },
  ]);

  const options = {
    orientation: 'both',
    editable: false,
    groupEditable: false,
    start: new Date(2014, 11, 10),
    end: Date.now(),
  };

  useEffect(() => {
    const timelineContainer = document.getElementById('timeline-container');

    const timeline = new Timeline(timelineContainer, items, {});
    timeline.setOptions(options);
    timeline.setGroups(groups);
    timeline.setItems(items);

    return () => {
      timeline.destroy();
    };
  }, [items]);

  return (
    <div style={{ paddingRight: '80px', paddingLeft: '80px', paddingBottom: '20px' }}>
      <div style={{ borderRadius: '30px' }} id='timeline-container' />
    </div>
  );
};

export default MyTimeline;
