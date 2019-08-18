import { SearchedFlightDetails } from './../model/SearchedFlightDetails';
import { FlightDirection } from './../model/FlightDirection';

export const mockFlightDetails: ReadonlyArray<SearchedFlightDetails> = [
  {
    origin: 'Pune (PNQ)',
    destination: 'Delhi (DEL)',
    direction: FlightDirection.DEPARTURE,
    date: '2020/11/01',
    flights: [
      {
        arrivalTime: '6:00',
        date: '2020/11/01',
        departureTime: '5:00',
        flightNo: 'AI-101',
        name: 'Air India',
        origin: 'Pune (PNQ)',
        destination: 'Delhi (DEL)',
        price: 3525
      },
      {
        arrivalTime: '6:00',
        date: '2020/11/01',
        departureTime: '5:00',
        flightNo: 'AI-101',
        name: 'Air India',
        origin: 'Pune (PNQ)',
        destination: 'Delhi (DEL)',
        price: 3525
      },
      {
        arrivalTime: '6:00',
        date: '2020/11/01',
        departureTime: '5:00',
        flightNo: 'AI-101',
        name: 'Air India',
        origin: 'Pune (PNQ)',
        destination: 'Delhi (DEL)',
        price: 3525
      },
      {
        arrivalTime: '20:00',
        date: '2020/11/01',
        departureTime: '5:00',
        origin: 'Pune (PNQ)',
        destination: 'Delhi (DEL)',
        price: 10525,
        stops: [
          {
            arrivalTime: '10:00',
            date: '2020/11/01',
            departureTime: '5:00',
            flightNo: 'AI-101',
            name: 'Air India',
            origin: 'Pune (PNQ)',
            destination: 'Mumbai (MUM)',
            price: 3000
          },
          {
            arrivalTime: '20:00',
            date: '2020/11/01',
            departureTime: '13:00',
            flightNo: 'AI-101',
            name: 'Air India',
            origin: 'Mumbai (MUM)',
            destination: 'Delhi (DEL)',
            price: 7525
          }
        ]
      },
      {
        arrivalTime: '20:00',
        date: '2020/11/01',
        departureTime: '5:00',
        origin: 'Pune (PNQ)',
        destination: 'Delhi (DEL)',
        price: 10525,
        stops: [
          {
            arrivalTime: '10:00',
            date: '2020/11/01',
            departureTime: '5:00',
            flightNo: 'AI-101',
            name: 'Air India',
            origin: 'Pune (PNQ)',
            destination: 'Mumbai (MUM)',
            price: 3000
          },
          {
            arrivalTime: '20:00',
            date: '2020/11/01',
            departureTime: '13:00',
            flightNo: 'AI-101',
            name: 'Air India',
            origin: 'Mumbai (MUM)',
            destination: 'Delhi (DEL)',
            price: 7525
          }
        ]
      }
    ]
  },
  {
    origin: 'Pune (PNQ)',
    destination: 'Delhi (DEL)',
    direction: FlightDirection.ARRIVAL,
    date: '2020/11/01',
    flights: [
      {
        arrivalTime: '6:00',
        date: '2020/11/01',
        departureTime: '5:00',
        flightNo: 'AI-101',
        name: 'Air India',
        origin: 'Pune (PNQ)',
        destination: 'Delhi (DEL)',
        price: 3525
      },
      {
        arrivalTime: '20:00',
        date: '2020/11/01',
        departureTime: '5:00',
        origin: 'Pune (PNQ)',
        destination: 'Delhi (DEL)',
        price: 10525,
        stops: [
          {
            arrivalTime: '10:00',
            date: '2020/11/01',
            departureTime: '5:00',
            flightNo: 'AI-101',
            name: 'Air India',
            origin: 'Pune (PNQ)',
            destination: 'Mumbai (MUM)',
            price: 3000
          },
          {
            arrivalTime: '20:00',
            date: '2020/11/01',
            departureTime: '13:00',
            flightNo: 'AI-101',
            name: 'Air India',
            origin: 'Mumbai (MUM)',
            destination: 'Delhi (DEL)',
            price: 7525
          }
        ]
      }
    ]
  }
];
