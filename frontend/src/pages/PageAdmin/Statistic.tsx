import React, { ReactNode, useEffect, useState, useMemo, Fragment, PureComponent, useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { centerUpdateAction, humanSearchUpdateAction, humanUpdateAction } from '../../core/lib/adapters';
import InputMask from "react-input-mask";
import CenterService from '../../core/lib/services/CenterService';
import { useAxios } from '../../hooks';
import { useSnackbar } from 'notistack';
import HumanService from '../../core/lib/services/HumanSearchService';
import { HumanSearchEntityInterface } from '../../core/lib/entities/Human';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { MRT_Localization_UK } from 'material-react-table/locales/uk';
import { Dialog, Transition } from '@headlessui/react';
import moment from 'moment';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Legend, Line, PieChart, Pie, Sector } from 'recharts';
import DistributionService from '../../core/lib/services/DistributionService';
import { colors } from '../../constants/colors';

type Props = {

  isLoading: boolean;
}


const Statistic = () => {

  const dispatch = useDispatch();
  const statisticCenter = useSelector((state: RootState) => state.statisticCenter.statisticCenter);
  const statisticCenterIsLoading = useSelector((state: RootState) => state.statisticCenter.isLoading);
  const statisticCenterEveryDay = useSelector((state: RootState) => state.statisticCenterEveryDay.statisticCenterEveryDay);
  const statisticCenterEveryDayIsLoading = useSelector((state: RootState) => state.statisticCenterEveryDay.isLoading);
  const centers = useSelector((state: RootState) => state.center.centers);
  const centersIsLoading = useSelector((state: RootState) => state.center.isLoading);
  const [dates, setDates] = useState({
    startDate: moment(moment().startOf('month').toISOString()).format('DD.MM.YYYY'),
    endDate: moment(moment().endOf('month').toISOString()).format('DD.MM.YYYY'),
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );


  const distributionService = new DistributionService(useAxios(), useSnackbar())
  const centerService = new CenterService(useAxios(), useSnackbar())
  useEffect(() => {
    distributionService.getStatisticCenter(dispatch, statisticCenterIsLoading, moment(dates.startDate, 'DD.MM.YYYY').toDate(), moment(dates.endDate, 'DD.MM.YYYY').toDate())
    distributionService.getStatisticCenterEveryDay(dispatch, statisticCenterIsLoading, moment(dates.startDate, 'DD.MM.YYYY').toDate(), moment(dates.endDate, 'DD.MM.YYYY').toDate())
    centerService.getCenters(dispatch, centersIsLoading)




  }, [dates])

  const handleChangeDate = (prop: any) => (event: any) => {
    setDates({ ...dates, [prop]: event.target.value })
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Кіл-сть: ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };



  return (
    <>

      <div className=" shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className=" px-4 py-3 text-center sm:px-6">
            <div className='relative shadow-md sm:rounded-lg'>
              <div className='grid grid-cols-8 gap-6 p-4'>
                <div className="col-span-4 sm:col-span-2 lg:col-span-1">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Початок
                  </label>

                  <InputMask
                    mask='99.99.9999'
                    value={dates.startDate}
                    placeholder="31.08.1997"
                    maskPlaceholder=""
                    onChange={handleChangeDate("startDate")}
                  >
                    <input type="text"
                      name="startDate"
                      id="startDate"

                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </InputMask>
                </div>
                <div className="col-span-4 sm:col-span-2 lg:col-span-1">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    Кінець
                  </label>

                  <InputMask
                    mask='99.99.9999'
                    value={dates.endDate}
                    placeholder="31.08.1997"
                    maskPlaceholder=""
                    onChange={handleChangeDate("endDate")}
                  >
                    <input type="text"
                      name="endDate"
                      id="endDate"

                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </InputMask>
                </div>
              </div>
              <div className='grid grid-cols-9 gap-6'>

                <div className="col-span-9 sm:col-span-6 lg:col-span-3">
                  <ResponsiveContainer width={"100%"} height={"100%"} aspect={1} >
                    <AreaChart
                      width={400}
                      height={100}
                      data={statisticCenterEveryDay.map(day => {
                        const centers = day.dailyStats.map(center => {
                          let centerParam: { [key: string]: number; } = {};
                          centerParam[String(center.name)] = center.totalAmount
                          return centerParam
                        })
                        let perDay = { name: day._id.slice(0, -5) }
                        for (let obj of centers) {
                          perDay = { ...perDay, ...obj };
                        }
                        return perDay
                      })}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="5 5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {centers.map((center, i) => {

                        return <Area connectNulls type="monotone" dataKey={center.name} stackId="1" stroke={colors[i]} fill={colors[i]} />
                      })}

                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="col-span-9 sm:col-span-6 lg:col-span-3">
                  <ResponsiveContainer width={"100%"} height={"100%"} aspect={1} >
                    <AreaChart
                      width={400}
                      height={100}
                      data={statisticCenterEveryDay.map(day => {
                        const centers = day.dailyStats.map(center => {
                          let centerParam: { [key: string]: number; } = {};
                          centerParam[String(center.name)] = center.totalCount
                          return centerParam
                        })
                        let perDay = { name: day._id.slice(0, -5) }
                        for (let obj of centers) {
                          perDay = { ...perDay, ...obj };
                        }
                        return perDay
                      })}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="5 5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {centers.map((center, i) => {

                        return <Area connectNulls type="monotone" dataKey={center.name} stackId={1} stroke={colors[i]} fill={colors[i]} />
                      })}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="col-span-9 sm:col-span-6 lg:col-span-3">
                  <ResponsiveContainer width="100%" height="100%" aspect={1}>
                    <LineChart
                      width={400}
                      height={100}
                      data={statisticCenterEveryDay.map(day => {
                        const centers = day.dailyStats.map(center => {
                          let centerParam: { [key: string]: number; } = {};
                          centerParam[String(center.name)] = center.totalAmount
                          return centerParam
                        })
                        let perDay = { name: day._id.slice(0, -5) }
                        for (let obj of centers) {
                          perDay = { ...perDay, ...obj };
                        }
                        return perDay
                      })}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="5 5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {centers.map((center, i) => {

                        return <Line connectNulls type="monotone" dataKey={center.name} stroke={colors[i]} activeDot={{ r: 8 }} />
                      })}

                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="col-span-9 sm:col-span-6 lg:col-span-3">
                  <ResponsiveContainer width="100%" height="100%" aspect={1}>
                    <LineChart
                      width={400}
                      height={100}
                      data={statisticCenterEveryDay.map(day => {
                        const centers = day.dailyStats.map(center => {
                          let centerParam: { [key: string]: number; } = {};
                          centerParam[String(center.name)] = center.totalCount
                          return centerParam
                        })
                        let perDay = { name: day._id.slice(0, -5) }
                        for (let obj of centers) {
                          perDay = { ...perDay, ...obj };
                        }
                        return perDay
                      })}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="5 5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {centers.map((center, i) => {

                        return <Line connectNulls type="monotone" dataKey={center.name} stroke={colors[i]} activeDot={{ r: 8 }} />
                      })}

                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="col-span-9 sm:col-span-3 lg:col-span-3">
                  <ResponsiveContainer width="100%" height="100%" aspect={1}>
                    <PieChart width={200} height={200}>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={statisticCenter.map(obj => ({ name: obj.name, value: obj.totalAmount, }))}
                        cx={200}
                        cy={200}
                        innerRadius={40}
                        outerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="col-span-9 sm:col-span-3 lg:col-span-3">
                  <ResponsiveContainer width="100%" height="100%" aspect={1}>

                    <PieChart width={200} height={200}>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={statisticCenter.map(obj => ({ name: obj.name, value: obj.totalCount, }))}
                        cx={200}
                        cy={200}
                        innerRadius={40}
                        outerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                      />
                    </PieChart>

                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
};

export default Statistic;


