import React, { useEffect } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import axios from 'axios';
import Cookies from 'js-cookie';

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month (0 for January)
const day = String(today.getDate() - 2).padStart(2, '0');
const nextDay = String(today.getDate() + 1).padStart(2, '0');

const todayDateFormatted = `${year}-${month}-${day}`;
const tomorrowDateFormatted = `${year}-${month}-${nextDay}`;

const MyTimeline = ({ plugs }) => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  };

  const groups = new DataSet([]);
  const items = new DataSet([]);

  useEffect(() => {
    async function handleData() {
      groups.clear();
      items.clear();
      for (const value of plugs) {
        groups.add({
          content: value.name,
          id: value.deviceId,
        });
        const incomingData = await axios.get(
          'https://onlab-backend.vercel.app/data/' + value.deviceId,
          config,
        );
        console.log(incomingData);
        incomingData.data.forEach((d) => {
          items.add({
            start: new Date(d.startTime),
            end: new Date(d.endTime),
            group: value.deviceId,
            className: value.color,
          });
          console.log({
            start: new Date(d.startTime),
            end: new Date(d.endTime),
            group: value.deviceId,
            className: value.color,
          });
        });
      }
    }
    handleData().then((r) => r);
  }, [plugs]);

  // const items = new DataSet([
  //   {
  //     start: new Date(2015, 0, 10),
  //     end: new Date(2015, 0, 11),
  //     group: 'ezek',
  //     className: 'dark-red',
  //   },
  //   {
  //     start: new Date(2015, 0, 22),
  //     end: new Date(2015, 0, 26),
  //     group: 'masok',
  //     className: 'mint-green',
  //   },
  //   {
  //     start: new Date('2024-05-03T12:00:00Z'),
  //     end: new Date('2024-05-03T12:02:00Z'),
  //     group: 'kell',
  //     className: 'mustard-yellow',
  //   },
  //   {
  //     start: new Date(2017, 0, 22),
  //     end: new Date(2018, 0, 26),
  //     group: 'masok',
  //     className: 'mint-green',
  //   },
  // ]);

  const options = {
    orientation: 'both',
    stack: false,
    editable: false,
    groupEditable: false,
    selectable: false,
    start: new Date(todayDateFormatted),
    end: new Date(tomorrowDateFormatted),
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
    <div style={{ paddingRight: '200px', paddingLeft: '200px', paddingBottom: '20px' }}>
      <div style={{ borderRadius: '30px' }} id='timeline-container' />
    </div>
  );
};

export default MyTimeline;
