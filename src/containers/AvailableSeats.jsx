import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Alert, Table } from 'antd'

import { diffTime, getNowDate } from '../utils/time'
import { fetchAvailableSeats } from '../redux/modules/availableSeats'

import Form from '../components/Form'
import Select from '../components/Form/Select'
import TagGroup from '../components/TagGroup'

import * as constants from './constants'

const AvailableSeats = ({
  dispatch,
  stations,
  isFetching,
  ODFare,
  dailyTimetable,
  availableSeats
}) => {
  const [destinationStation, setDestinationStation] = useState()
  const [doSubmit, setDoSubmit] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const fields = [
    {
      label: constants.ORIGIN_STATION,
      id: 'originStation',
      options: {
        initialValue: constants.DEFAULT_SELECT_OPTION,
      },
      component: Select(stations),
    },
    {
      label: constants.DESTINATION_STATION,
      id: 'destinationStation',
      options: {
        initialValue: constants.DEFAULT_SELECT_OPTION,
      },
      component: Select(stations),
    }
  ]

  const validateFields = (error, fieldsValue) => {
    setErrorMessage(null)
    setDoSubmit(true)

    if (error) {
      setErrorMessage(error)
      return
    }

    if ([fieldsValue.originStation, fieldsValue.destinationStation].includes(constants.DEFAULT_SELECT_OPTION)) {
      setErrorMessage(constants.NO_SELECT_STATION)
      return
    }

    if (fieldsValue.originStation === fieldsValue.destinationStation) {
      setErrorMessage(constants.NOT_BE_THE_SAME_STATION)
      return
    }

    setDestinationStation(fieldsValue.destinationStation)

    dispatch(fetchAvailableSeats({
      trainDate: getNowDate('YYYY-MM-DD'),
      ...fieldsValue,
    }))
  }

  const columns = [
    {
      title: constants.TRAIN_NUMBER,
      dataIndex: 'trainNumber',
      align: 'center',
    },
    {
      title: constants.DEPATURE_TIME,
      dataIndex: 'departureTime',
      align: 'center',
    },
    {
      title: constants.ARRIVAL_TIME,
      dataIndex: 'arrivalTime',
      align: 'center',
    },
    {
      title: constants.TRIVAL_TIME,
      dataIndex: 'travelTime',
      sorter: (a, b) => diffTime(a.travelTime, b.travelTime),
      sortDirections: ['ascend', 'descend'],
      align: 'center',
    },
    {
      title: constants.AVAILABLE_SEAT,
      dataIndex: 'seatTags',
      align: 'center',
      render: TagGroup,
    },
    {
      title: constants.FARE,
      dataIndex: 'fareTags',
      align: 'center',
      render: TagGroup,
    }
  ]

  let timeTable = []
  let dataSource = []

  if (availableSeats.length) {
    const standardPrice = ODFare[0].Fares.filter(fare => fare.TicketType === '標準')[0].Price
    const businessPrice = ODFare[0].Fares.filter(fare => fare.TicketType === '商務')[0].Price

    timeTable = dailyTimetable.reduce((trains, train) => {
      trains[train.DailyTrainInfo.TrainNo] = {
        trainNumber: train.DailyTrainInfo.TrainNo,
        departureTime: train.OriginStopTime.DepartureTime,
        arrivalTime: train.DestinationStopTime.ArrivalTime,
        travelTime: diffTime(train.DestinationStopTime.ArrivalTime, train.OriginStopTime.DepartureTime, 'HH:mm'),
      }

      return trains
    }, {})


    dataSource = availableSeats[0].AvailableSeats.filter(train =>
          diffTime(getNowDate('HH:mm'), train.DepartureTime) < 0).reduce((list, train) => {
            const seats = train.StopStations.filter(station =>
              station.StationID === destinationStation
            )[0]

            const trainNumber = train.TrainNo
            const times = timeTable[trainNumber]

            if (seats && times) {
              const standardSeatStatus = seats.StandardSeatStatus
              const businessSeatStatus = seats.BusinessSeatStatus
              const key = trainNumber
              const seatTags = []
              const fareTags = []
              let color

              if (standardSeatStatus === 'Available') {
                color = 'geekblue'
                seatTags.push({ text: constants.STANDARD_SEAT, color, })
                fareTags.push({ text: `$${standardPrice}`, color })
              }

              if (businessSeatStatus === 'Available') {
                color = 'volcano'
                seatTags.push({ text: constants.BUSINESS_SEAT, color })
                fareTags.push({ text: `$${businessPrice}`, color })
              }

              if (seatTags.length) {
                list.push({
                  key,
                  trainNumber,
                  standardSeatStatus,
                  businessSeatStatus,
                  seatTags,
                  fareTags,
                  ...times,
                })
              }
            }

            return list
          }, []).sort((a, b) => diffTime(a.departureTime, b.departureTime))
  }

  return (
    <>
      <Form
        fields={fields}
        validateFields={validateFields}
      />
      {errorMessage &&
        <Alert
          message={errorMessage}
          type="error"
          closable
        />}
      {doSubmit && !errorMessage &&
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={isFetching}
        />}
    </>
  )
}

const mapStateToProps = state => ({
  stations: state.stations.list.map(station => ({
    text: station.StationName.Zh_tw,
    value: station.StationID,
  })),
  isFetching: state.availableSeats.isFetching,
  ODFare: state.availableSeats.ODFare,
  dailyTimetable: state.availableSeats.dailyTimetable,
  availableSeats: state.availableSeats.availableSeats,
})

export default connect(mapStateToProps)(AvailableSeats)