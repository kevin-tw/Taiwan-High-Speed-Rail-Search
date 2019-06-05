const mockStations = [
  {
    StationID: '0990',
    StationName: {Zh_tw: '南港', En: 'Nangang'},
    UpdateTime: '2017-04-11T11:05:00+08:00',
    VersionID: 1
  }
]

const mockODFare = [
  {
    Direction: 0,
    Fares: [
      {
        TicketType: '自由',
        Price: 155
      },
      {
        TicketType: '標準',
        Price: 160
      },
      {
        TicketType: '商務',
        Price: 440
      }
    ],
    SrcUpdateTime: '2016-06-12T13:00:00+08:00',
    UpdateTime: '2019-06-03T23:53:46+08:00',
    VersionID: 3552
  }
]

const mockDailyTimetable = [
  {
    TrainDate: '2019-06-04',
    DailyTrainInfo: {
      TrainNo: '0603',
      Direction: 0,
      StartingStationID: '0990',
      StartingStationName: {
        Zh_tw: '南港',
        En: 'Nangang'
      },
      EndingStationID: '1070',
      EndingStationName: {
        Zh_tw: '左營',
        En: 'Zuoying'
      },
      Note: {}
    },
    OriginStopTime: {
      StopSequence: 3,
      StationID: '1010',
      StationName: {
        Zh_tw: '板橋',
        En: 'Banciao'
      },
      ArrivalTime: '06:59',
      DepartureTime: '07:00'
    },
    DestinationStopTime: {
      StopSequence: 4,
      StationID: '1020',
      StationName: {
        Zh_tw: '桃園',
        En: 'Taoyuan'
      },
      ArrivalTime: '07:13',
      DepartureTime: '07:15'
    },
    UpdateTime: '2019-05-08T00:00:00+08:00',
    VersionID: 1
  }
]

const mockAvailableSeats = [
  {
    UpdateTime: '2019-06-04T18:00:32+08:00',
    AvailableSeats: [
      {
        TrainNo: '0108',
        Direction: 1,
        StationID: '1000',
        StationName: {
          Zh_tw: '台北',
          En: 'Taipei'
        },
        DepartureTime: '09:32',
        EndingStationID: '0990',
        EndingStationName: {
          Zh_tw: '南港',
          En: 'Nangang'
        },
        StopStations: [
          {
            StationID: '0990',
            StationName: {
              Zh_tw: '南港',
              En: 'Nangang'
            },
            StandardSeatStatus: 'Available',
            BusinessSeatStatus: 'Available'
          }
        ],
        SrcRecTime: '2019-06-04T17:53:07+08:00',
        UpdateTime: '2019-06-04T18:00:32+08:00'
      }
    ]
  }
]

export {
  mockStations,
  mockODFare,
  mockDailyTimetable,
  mockAvailableSeats,
}