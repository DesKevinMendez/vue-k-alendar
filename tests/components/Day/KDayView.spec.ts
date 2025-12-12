import KDayView from '@/components/Day/KDayView.vue';

import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import type { KEvent } from '@/types/Events';

describe('KDayView', () => {
  let wrapper: VueWrapper<KDayView>;
  const events: KEvent[] = [
    {
      id: '019b0aba-cc6c-736a-9503-0b1c8e7a6bf5',
      title: 'Pizza Hut (IGG-3519)',
      start_date: '2025-12-10T05:59:59.999Z',
      end_date: '',
      description:
        'Vehículo: IGG-3519\nDestino: Pizza Hut\nCoordenadas: 13.7014537, -89.22279309999999',
      color: '#fbbf24'
    },
    {
      id: '019b0aae-b5d3-70d2-9f0e-88c579168ee7',
      title: 'Parque central de La Palma, Chalatenango. (IGG-3519)',
      start_date: '2025-12-11T08:30:00.999Z',
      end_date: '',
      description:
        'Vehículo: IGG-3519\nDestino: Parque central de La Palma, Chalatenango.\nCoordenadas: 14.3170912, -89.1706838',
      color: '#fbbf24'
    },
    {
      id: '019afbc3-a702-7173-945e-af576a73803b',
      title: 'MRHQ+G9 Soyapango, El Salvador (IGG-3519)',
      start_date: '2025-12-11T11:00:00.999Z',
      end_date: '',
      description:
        'Vehículo: IGG-3519\nDestino: MRHQ+G9 Soyapango, El Salvador\nCoordenadas: 13.67884722049237, -89.16160583496094',
      color: '#fbbf24'
    },
    {
      id: '019afbc3-a702-7173-945e-af576a73803b',
      title: 'MRHQ+G9 Soyapango, El Salvador 2 (IGG-3519)',
      start_date: '2025-12-11T11:30:00.999Z',
      end_date: '',
      description:
        'Vehículo: IGG-3519\nDestino: MRHQ+G9 Soyapango, El Salvador\nCoordenadas: 13.67884722049237, -89.16160583496094',
      color: '#807900'
    },
    {
      id: '019afbc3-a702-7173-945e-af576a73803c',
      title: 'Soyapango, El Salvador',
      start_date: '2025-12-11T11:45:00.999Z',
      end_date: '2025-12-11T14:45:00.999Z',
      description:
        'Vehículo: IGG-3519\nDestino: MRHQ+G9 Soyapango, El Salvador\nCoordenadas: 13.67884722049237, -89.16160583496094',
      color: '#175000'
    },
    {
      id: '019afbc3-a702-7173-945e-af576a73803c',
      title: 'Aereopuerto, El Salvador',
      start_date: '2025-12-11T12:00:00.999Z',
      end_date: '',
      description:
        'Vehículo: IGG-3519\nDestino: MRHQ+G9 Soyapango, El Salvador\nCoordenadas: 13.67884722049237, -89.16160583496094',
      color: '#008080'
    },
    {
      id: '019afbc3-a702-7173-945e-af576a73803d',
      title: 'Parque central de La Palma, Chalatenango.',
      start_date: '2025-12-11T20:00:00.999Z',
      end_date: '2025-12-12T02:15:00.999Z',
      description:
        'Vehículo: IGG-3519\nDestino: MRHQ+G9 Soyapango, El Salvador\nCoordenadas: 13.67884722049237, -89.16160583496094',
      color: '#008080'
    },
  ];

  beforeEach(() => {
    wrapper = mount(KDayView, {
      props: {
        events,
      },
    });
  });

  it('should render the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Hours', () => {
    it('k-day-view-hour should contain 24 hours', () => {
      const hours = wrapper.find('.k-day-view-hour');
      const slots = hours.findAll('.k-day-view-hour-slot');
      expect(slots.length).toBe(24);

      const hoursGenerated = Array.from({ length: 24 }, (_, index) => {
        const hour24 = index
        if (hour24 === 0) return '12:00 AM'
        if (hour24 < 12) return `${hour24.toString().padStart(2, '0')}:00 AM`
        if (hour24 === 12) return '12:00 PM'
        return `${(hour24 - 12).toString().padStart(2, '0')}:00 PM`
      })

      hoursGenerated.forEach((hour, index) => {
        expect(slots.at(index)?.text()).toBe(hour);
      });
    });
  })
  describe('Events', () => {
    it('should render 24 slots for the events', () => {
      const container = wrapper.find('.k-day-view-events-container');
      const slots = container.findAll('.k-day-view-event-slot');
      expect(slots.length).toBe(24);
    });

    it('should render the events in the correct slot', () => {
      const container = wrapper.find('.k-day-view-events-container');

      /**
       * I prefer to get exactly each slot element by hour for testing instead of use "for", because,
       * I Don't like to use "if" in tests
       */

      const slot12AM = container.find('.k-day-view-event-slot[calendar-hour-container="12:00 AM"]');      
      const slot1AM = container.find('.k-day-view-event-slot[calendar-hour-container="01:00 AM"]');
      const slot2AM = container.find('.k-day-view-event-slot[calendar-hour-container="02:00 PM"]');
      const slot3AM = container.find('.k-day-view-event-slot[calendar-hour-container="03:00 AM"]');
      const slot4AM = container.find('.k-day-view-event-slot[calendar-hour-container="04:00 AM"]');
      const slot5AM = container.find('.k-day-view-event-slot[calendar-hour-container="05:00 AM"]');
      const slot6AM = container.find('.k-day-view-event-slot[calendar-hour-container="06:00 AM"]');
      const slot7AM = container.find('.k-day-view-event-slot[calendar-hour-container="07:00 AM"]');
      const slot8AM = container.find('.k-day-view-event-slot[calendar-hour-container="08:00 AM"]');
      const slot9AM = container.find('.k-day-view-event-slot[calendar-hour-container="09:00 AM"]');
      const slot10AM = container.find('.k-day-view-event-slot[calendar-hour-container="10:00 AM"]');
      const slot11AM = container.find('.k-day-view-event-slot[calendar-hour-container="11:00 AM"]');
      const slot12PM = container.find('.k-day-view-event-slot[calendar-hour-container="12:00 PM"]');
      const slot1PM = container.find('.k-day-view-event-slot[calendar-hour-container="01:00 PM"]');
      const slot2PM = container.find('.k-day-view-event-slot[calendar-hour-container="02:00 PM"]');
      const slot3PM = container.find('.k-day-view-event-slot[calendar-hour-container="03:00 PM"]');
      const slot4PM = container.find('.k-day-view-event-slot[calendar-hour-container="04:00 PM"]');
      const slot5PM = container.find('.k-day-view-event-slot[calendar-hour-container="05:00 PM"]');
      const slot6PM = container.find('.k-day-view-event-slot[calendar-hour-container="06:00 PM"]');
      const slot7PM = container.find('.k-day-view-event-slot[calendar-hour-container="07:00 PM"]');
      const slot8PM = container.find('.k-day-view-event-slot[calendar-hour-container="08:00 PM"]');
      const slot9PM = container.find('.k-day-view-event-slot[calendar-hour-container="09:00 PM"]');
      const slot10PM = container.find('.k-day-view-event-slot[calendar-hour-container="10:00 PM"]');
      const slot11PM = container.find('.k-day-view-event-slot[calendar-hour-container="11:00 PM"]');

      expect(slot12AM.element.children.length).toBe(0); 
      expect(slot1AM.element.children.length).toBe(0);
      expect(slot3AM.element.children.length).toBe(0);    
      expect(slot4AM.element.children.length).toBe(0);
      expect(slot2AM.element.children.length).toBe(1);
      expect(slot5AM.element.children.length).toBe(3);
      expect(slot6AM.element.children.length).toBe(1);
      expect(slot7AM.element.children.length).toBe(0);
      expect(slot8AM.element.children.length).toBe(0);
      expect(slot9AM.element.children.length).toBe(0);
      expect(slot10AM.element.children.length).toBe(0);
      expect(slot11AM.element.children.length).toBe(0);
      expect(slot12PM.element.children.length).toBe(0);
      expect(slot1PM.element.children.length).toBe(0);
      expect(slot2PM.element.children.length).toBe(1);
      expect(slot3PM.element.children.length).toBe(0);
      expect(slot4PM.element.children.length).toBe(0);
      expect(slot5PM.element.children.length).toBe(0);
      expect(slot6PM.element.children.length).toBe(0);
      expect(slot7PM.element.children.length).toBe(0);
      expect(slot8PM.element.children.length).toBe(0);
      expect(slot9PM.element.children.length).toBe(0);
      expect(slot10PM.element.children.length).toBe(0);
      expect(slot11PM.element.children.length).toBe(0);
    });

    it('should calculate width dinamically based on 70px of overlap', () => {
      const container = wrapper.find('.k-day-view-events-container');
      const slot5AM = container.find('.k-day-view-event-slot[calendar-hour-container="05:00 AM"]');
      const firstEvent = slot5AM.find('.k-day-view-event-item');
      const secondEvent = slot5AM.findAll('.k-day-view-event-item').at(1);
      const thirdEvent = slot5AM.findAll('.k-day-view-event-item').at(2);
      expect(firstEvent.element.style.width).toBe('calc(100% - 0px)');
      expect(secondEvent.element.style.width).toBe('calc(100% - 70px)');
      expect(thirdEvent.element.style.width).toBe('calc(100% - 140px)');
    });

    it('shoud calculate the top position dinamically based on the event start time', () => {
      const container = wrapper.find('.k-day-view-events-container');
      const slot5AM = container.find('.k-day-view-event-slot[calendar-hour-container="05:00 AM"]');
      const firstEvent = slot5AM.find('.k-day-view-event-item');
      const secondEvent = slot5AM.findAll('.k-day-view-event-item').at(1);
      const thirdEvent = slot5AM.findAll('.k-day-view-event-item').at(2);
      expect(firstEvent.element.style.top).toBe('0%');
      expect(secondEvent.element.style.top).toBe('50%');
      expect(thirdEvent.element.style.top).toBe('75%');
    });

    it('should calculate the left position dinamically based on the event start time', () => {
      const container = wrapper.find('.k-day-view-events-container');
      const slot5AM = container.find('.k-day-view-event-slot[calendar-hour-container="05:00 AM"]');
      const firstEvent = slot5AM.find('.k-day-view-event-item');
      const secondEvent = slot5AM.findAll('.k-day-view-event-item').at(1);
      const thirdEvent = slot5AM.findAll('.k-day-view-event-item').at(2);
      expect(firstEvent.element.style.left).toBe('0px');
      expect(secondEvent.element.style.left).toBe('70px');
      expect(thirdEvent.element.style.left).toBe('140px');
    });

    it('should calculate the height dinamically based on the event start time', () => {
      const container = wrapper.find('.k-day-view-events-container');
      const slot5AM = container.find('.k-day-view-event-slot[calendar-hour-container="05:00 AM"]');
      const firstEvent = slot5AM.find('.k-day-view-event-item');
      const secondEvent = slot5AM.findAll('.k-day-view-event-item').at(1);
      const thirdEvent = slot5AM.findAll('.k-day-view-event-item').at(2);
      expect(firstEvent.element.style.height).toBe('100%');
      expect(secondEvent.element.style.height).toBe('100%'); 
      expect(thirdEvent.element.style.height).toBe('300%'); // 300% because the event is from 05:45 AM to 08:45 AM (3 hours) one hour is 100% so 3 hours is 300%
    });

    it('should calculate the z-index dinamically based on the event start time', () => {
      const container = wrapper.find('.k-day-view-events-container');
      const slot5AM = container.find('.k-day-view-event-slot[calendar-hour-container="05:00 AM"]');
      const firstEvent = slot5AM.find('.k-day-view-event-item');
      const secondEvent = slot5AM.findAll('.k-day-view-event-item').at(1);
      const thirdEvent = slot5AM.findAll('.k-day-view-event-item').at(2);
      expect(firstEvent.element.style.zIndex).toBe('10');
      expect(secondEvent.element.style.zIndex).toBe('11');
      expect(thirdEvent.element.style.zIndex).toBe('12');
    });

    it('k-day-view-event-title should be the event title', () => {      const container = wrapper.find('.k-day-view-events-container');
      const slot5AM = container.find('.k-day-view-event-slot[calendar-hour-container="05:00 AM"]');
      const firstEvent = slot5AM.find('.k-day-view-event-item');
      const secondEvent = slot5AM.findAll('.k-day-view-event-item').at(1);
      const thirdEvent = slot5AM.findAll('.k-day-view-event-item').at(2);

      const h3FirstEvent = firstEvent.find('h3.k-day-view-event-title');
      const h3SecondEvent = secondEvent.find('h3.k-day-view-event-title');
      const h3ThirdEvent = thirdEvent.find('h3.k-day-view-event-title');

      expect(h3FirstEvent.text()).toBe('MRHQ+G9 Soyapango, El Salvador (IGG-3519)');
      expect(h3SecondEvent.text()).toBe('MRHQ+G9 Soyapango, El Salvador 2 (IGG-3519)');
      expect(h3ThirdEvent.text()).toBe('Soyapango, El Salvador');
    });

    it('k-day-view-event-time should be the event time', () => {
      const container = wrapper.find('.k-day-view-events-container');
      const slot5AM = container.find('.k-day-view-event-slot[calendar-hour-container="05:00 AM"]');
      const firstEvent = slot5AM.find('.k-day-view-event-item');
      const secondEvent = slot5AM.findAll('.k-day-view-event-item').at(1);
      const thirdEvent = slot5AM.findAll('.k-day-view-event-item').at(2);
      
      const pFirstEvent = firstEvent.find('p.k-day-view-event-time');
      const pSecondEvent = secondEvent.find('p.k-day-view-event-time');
      const pThirdEvent = thirdEvent.find('p.k-day-view-event-time');

      expect(pFirstEvent.text()).toBe('05:00 AM');
      expect(pSecondEvent.text()).toBe('05:30 AM');
      expect(pThirdEvent.text()).toBe('05:45 AM - 08:45 AM');
    });
  });
});