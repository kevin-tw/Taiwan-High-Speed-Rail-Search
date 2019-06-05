import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Alert, DatePicker, Table } from 'antd'

import { diffTime, getNowDate } from '../utils/time'
import { fetchSchedule } from '../redux/modules/schedule'

import Form from '../components/Form'
import Select from '../components/Form/Select'

import * as constants from './constants'

const Schedule = ({ dispatch, stations, isFetching, ODFare, dailyTimetable }) => {
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
    },
    {
      label: constants.TRAIN_DATE,
      id: 'trainDate',
      options: {
        initialValue: getNowDate(),
      },
      component: <DatePicker />,
    }
  ]

  const validateFields = (error, fieldsValue) => {
    setErrorMessage(null)
    setDoSubmit(true)

    if (error) {
      setErrorMessage(error)
      return
    }

    fieldsValue.trainDate = fieldsValue.trainDate.format('YYYY-MM-DD')

    if ([fieldsValue.originStation, fieldsValue.destinationStation].includes(constants.DEFAULT_SELECT_OPTION)) {
      setErrorMessage(constants.NO_SELECT_STATION)
      return
    }

    if (fieldsValue.originStation === fieldsValue.destinationStation) {
      setErrorMessage(constants.NOT_BE_THE_SAME_STATION)
      return
    }

    dispatch(fetchSchedule(fieldsValue))
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
      title: constants.FARE,
      dataIndex: 'fare',
      align: 'center',
    },
  ]

  let dataSource = dailyTimetable.map(train => ({
    key: train.DailyTrainInfo.TrainNo,
    trainNumber: train.DailyTrainInfo.TrainNo,
    departureTime: train.OriginStopTime.DepartureTime,
    arrivalTime: train.DestinationStopTime.ArrivalTime,
    travelTime: diffTime(train.DestinationStopTime.ArrivalTime, train.OriginStopTime.DepartureTime, 'HH:mm'),
    fare: `$${ODFare[0].Fares[1].Price}`
  })).sort((a, b) => diffTime(a.departureTime, b.departureTime))

  return (
    <>
      <Form
        fields={fields}
        validateFields={validateFields}
      />
      {
        errorMessage &&
        <Alert
          message={errorMessage}
          type="error"
          closable
        />
      }
      {
        doSubmit && !errorMessage &&
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={isFetching}
        />
      }
    </>
  )
}

const mapStateToProps = state => ({
  stations: state.stations.list.map(station => ({
    text: station.StationName.Zh_tw,
    value: station.StationID,
  })),
  isFetching: state.schedule.isFetching,
  ODFare: state.schedule.ODFare,
  dailyTimetable: state.schedule.dailyTimetable,
})

export default connect(mapStateToProps)(Schedule)