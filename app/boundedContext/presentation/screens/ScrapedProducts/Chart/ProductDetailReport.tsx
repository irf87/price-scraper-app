import React, {useMemo} from 'react';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {G, Text} from 'react-native-svg';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import {View} from 'react-native';

import ScreenLayout from '@design-system/templates/screenLayout/ScreenLayout';

import {useGetStoredScrapedProductRecord} from '@domains/scrapedProductsRecord/application/useScrapedProductRecord';
import {convertToPrice} from '@utils/currency';

import {formatDay} from '@utils/date';

function ProductDetailReport() {
  const {getStoredData} = useGetStoredScrapedProductRecord();

  const data = useMemo(() => {
    return getStoredData()?.records || [];
  }, [getStoredData]);

  const prices = useMemo(() => {
    return data.map(item => item.price);
  }, [data]);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  return (
    <ScreenLayout showHeader={false}>
      <View style={{height: 300, padding: 20, flexDirection: 'row'}}>
        <YAxis
          data={prices}
          contentInset={{top: 20, bottom: 20}}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={6}
          formatLabel={value => convertToPrice(value)}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <LineChart
            style={{flex: 1}}
            data={data}
            yAccessor={({item}) => item.price}
            xAccessor={({item}) => item.date}
            yScale={scale.scaleLinear}
            xScale={scale.scaleTime}
            svg={{stroke: 'rgb(134, 65, 244)'}}
            contentInset={{top: 20, bottom: 20}}
            curve={shape.curveLinear}>
            <Grid />
            <G>
              <Text
                x={0}
                y={200}
                fontSize={12}
                fill="green"
                alignmentBaseline="middle">
                {convertToPrice(minPrice)}
              </Text>
              {/* Etiqueta para el valor máximo */}
              <Text
                x={0}
                y={50}
                fontSize={12}
                fill="red"
                alignmentBaseline="middle">
                {convertToPrice(maxPrice)}
              </Text>
            </G>
          </LineChart>
          <XAxis
            style={{marginHorizontal: -10, height: 30}}
            data={data}
            xAccessor={({item}) => item.date}
            scale={scale.scaleTime}
            formatLabel={value => formatDay(value, 'MMM YY')}
            contentInset={{left: 10, right: 10}}
            svg={{fontSize: 7, fill: 'black', rotation: 90, originY: 20, y: 10}}
          />
        </View>
      </View>
    </ScreenLayout>
  );
}

export default ProductDetailReport;
