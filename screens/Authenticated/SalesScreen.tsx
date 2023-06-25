import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Share,
  FlatList,
  // Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import {
  SalesCalenderSvgComponent,
  SalesDownSvgComponent,
  SalesShareSvgComponent,
  SalesUpSvgComponent,
} from '@/assets/icons';
// import { IconButton } from 'react-native-paper';
import { Button, Chip, Image } from '@rneui/themed';
import Colors from '@/constants/Colors';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import // LineChart,
// BarChart,
// PieChart,
// ProgressChart,
// ContributionGraph,
// StackedBarChart
'react-native-chart-kit';
import { salesCards, salesTopProducts } from '@/data/dummy_data';
import { ScrollView } from 'react-native-gesture-handler';

const SalesScreen = () => {
  const handleShareLink = async () => {
    try {
      const result = await Share.share(
        {
          message: 'https://www.google.com/',
          url: 'https://www.google.com/',
          title: 'Eazy Retail',
        },
        {
          dialogTitle: 'Share Eazy Retail',
        }
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('shared with activity type of', result.activityType);
        } else {
          console.log('shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed');
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  // console.log('SalesFaker :>> ', SalesFaker);

  // ********* DATE PICKER *********
  const [currDate, setCurrDate] = useState(new Date());

  const [show, setShow] = useState(false);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || currDate;
    setShow(false);
    setCurrDate(currentDate);
  };
  // console.log('currDate :>> ', currDate);

  // ********** ACTIVE FILTER **********
  const [activeFilter, setActiveFilter] = useState('Daily');
  const [rangeText, setRangeText] = useState('25 June 2023');

  const handleActiveFilter = (filter: string, range: string) => {
    setActiveFilter(filter);
    setRangeText(range);
  };

  // const handleChangeFilter = (filter: string) => {};

  // const testData = {
  //   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43, 50],
  //       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
  //       strokeWidth: 2, // optional
  //     },
  //   ],
  // };

  // ********** DIFFERENT SALES CARDS **********
  // salesCards

  interface SalesCard {
    id: string;
    name: string;
    amount: string;
    type: string;
    cost: string;
  }

  const renderSales = ({ item }: { item: SalesCard }) => {
    return (
      <View
        style={[
          styles.salesCardWrapper,
          {
            marginRight: +item.id % 2 == 0 ? 0 : 10,
          },
        ]}
      >
        <View style={styles.salesTypeWrapper}>
          {item.type == 'gain' && <SalesUpSvgComponent />}
          {item.type == 'loss' && <SalesDownSvgComponent />}
          <Text
            style={[
              styles.salesTypeText,
              {
                color:
                  item.type == 'gain'
                    ? Colors['salesCardProfit']
                    : Colors['salesCardLoss'],
              },
            ]}
          >
            &#8358;{item.cost}
          </Text>
        </View>
        <Text style={styles.salesCardTitle}>{item.name}</Text>
        <Text style={styles.salesCardAmount}>&#8358;{item.amount}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Sales</Text>
            <View style={styles.headerIconWrapper}>
              <Button
                type='clear'
                icon={<SalesShareSvgComponent />}
                buttonStyle={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
                radius={100}
                titleStyle={{
                  color: Colors.grey,
                }}
                onPress={handleShareLink}
              />
              <View>
                <Button
                  type='clear'
                  icon={<SalesCalenderSvgComponent />}
                  buttonStyle={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                  }}
                  radius={100}
                  titleStyle={{
                    color: Colors.grey,
                  }}
                  onPress={() => setShow(true)}
                />
              </View>
            </View>
          </View>
          <View style={styles.salesCardContainer}>
            <View style={styles.chipWrapper}>
              <Chip
                title='Daily'
                type='solid'
                color={
                  activeFilter === 'Daily'
                    ? Colors['purple']
                    : Colors['purpleBackground']
                }
                // onPress={() => setActiveFilter('Daily')}
                onPress={() => handleActiveFilter('Daily', '25 June 2023')}
                buttonStyle={{
                  paddingHorizontal: 20,
                }}
                titleStyle={{
                  color: activeFilter === 'Daily' ? 'white' : Colors['purple'],
                  fontFamily: 'Givonic-Bold',
                }}
              />
              <Chip
                title='Weekly'
                type='solid'
                color={
                  activeFilter === 'Weekly'
                    ? Colors['purple']
                    : Colors['purpleBackground']
                }
                // onPress={() => setActiveFilter('Weekly')}
                onPress={() =>
                  handleActiveFilter('Weekly', '20 June - 25 June 2023')
                }
                buttonStyle={{
                  paddingHorizontal: 20,
                }}
                titleStyle={{
                  color: activeFilter === 'Weekly' ? 'white' : Colors['purple'],
                  fontFamily: 'Givonic-Bold',
                }}
              />
              <Chip
                title='Monthly'
                type='solid'
                color={
                  activeFilter === 'Monthly'
                    ? Colors['purple']
                    : Colors['purpleBackground']
                }
                // onPress={() => setActiveFilter('Monthly')}
                onPress={() => handleActiveFilter('Monthly', 'June 2023')}
                buttonStyle={{
                  paddingHorizontal: 20,
                }}
                titleStyle={{
                  color:
                    activeFilter === 'Monthly' ? 'white' : Colors['purple'],
                  fontFamily: 'Givonic-Bold',
                }}
              />
            </View>
            {/*  range selector */}
            <View style={styles.rangeSelectorWrapper}>
              <Button
                type='clear'
                icon={{
                  name: 'chevron-left',
                  color: Colors['darkGrey'],
                  // size: 25,
                }}
                buttonStyle={{
                  paddingVertical: 10,
                }}
                titleStyle={{
                  color: Colors['darkGrey'],
                }}
                size='sm'
                radius={100}
              />
              <Text style={styles.rangeText}>{rangeText}</Text>
              <Button
                type='clear'
                icon={{
                  name: 'chevron-right',
                  color: Colors['darkGrey'],
                  // size: 25,
                }}
                buttonStyle={{
                  paddingVertical: 10,
                }}
                titleStyle={{
                  color: Colors['darkGrey'],
                }}
                size='sm'
                radius={100}
              />
            </View>

            {/* sales summary */}
            <View style={styles.salesSummaryWrapper}>
              <Text style={styles.salesSummaryText}>Total Sales</Text>
              <Text style={styles.salesValueText}>&#8358;1000</Text>
            </View>

            {/* chart */}
            {/* <View style={styles.chartsWrapper}>
          <LineChart
            data={testData}
            // width={Dimensions.get('window').width - 100}
            width={320}
            height={220}
            chartConfig={{
              backgroundColor: Colors.purpleBackground,
              // backgroundGradientFrom: Colors.purple,
              // backgroundGradientTo: Colors['purple-100'],
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View> */}
          </View>

          {/* six cards */}
          <View style={styles.allSalesCardsContainer}>
            <FlatList
              data={salesCards}
              renderItem={renderSales}
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              // contentContainerStyle={{
              //   paddingHorizontal: 5,
              //   paddingBottom: 10,
              // }}
            />
          </View>
          {/* top products */}
          <View style={styles.topProductsWrapper}>
            <Text style={styles.topProductsText}>Top Products</Text>
            {salesTopProducts.map((item) => (
              <View key={item.id} style={styles.topProductCardWrapper}>
                <View style={styles.imageDescription}>
                  <Image
                    source={{
                      uri: item?.image,
                    }}
                    style={styles.image}
                  />
                  <View style={styles.description}>
                    <Text numberOfLines={1} style={styles.title}>
                      {item.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.price}>
                      {item?.sold} sold
                    </Text>
                  </View>
                </View>
                <View style={styles.totalPriceWrapper}>
                  <Text numberOfLines={1} style={styles.totalPriceText}>
                    ₦{item.amount}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          {/* calender */}
          <View>
            {show && (
              <DateTimePicker
                value={currDate}
                onChange={onChangeDate}
                maximumDate={new Date()}
                minimumDate={new Date(2023, 4, 1)}
                // neutralButtonLabel='clear'
                // negativeButtonLabel='cancel'
                // positiveButtonLabel='ok'
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SalesScreen;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 10,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 25,
    // fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: 'Givonic-Bold',
  },
  headerIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 90,
  },
  salesCardContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    marginBottom: 20,
  },
  chipWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  rangeSelectorWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  rangeText: {
    fontSize: 17,
    // fontWeight: 'bold',
    color: Colors['green'],
    fontFamily: 'Givonic-Bold',
  },
  salesSummaryWrapper: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  salesSummaryText: {
    fontSize: 15,
    // fontWeight: 'bold',
    color: Colors['darkGrey'],
    fontFamily: 'Givonic-SemiBold',
  },
  salesValueText: {
    fontSize: 25,
    // fontWeight: 'bold',
    color: Colors['black'],
    fontFamily: 'Givonic-Bold',
  },
  chartsWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  allSalesCardsContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 20,
  },
  salesCardWrapper: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: '48.5%',
  },
  salesTypeWrapper: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  salesTypeText: {
    fontSize: 12,
    // fontWeight: 'bold',
    color: Colors['salesCardProfit'],
    fontFamily: 'Givonic-SemiBold',
    marginLeft: 10,
  },
  salesCardTitle: {
    fontSize: 17,
    // fontWeight: 'bold',
    color: Colors['salesCardTitle'],
    fontFamily: 'Givonic-SemiBold',
    marginTop: 10,
  },
  salesCardAmount: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: Colors['cardBlack'],
    fontFamily: 'Givonic-Bold',
    marginTop: 5,
  },
  topProductsWrapper: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 20,
  },
  topProductsText: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: Colors['black'],
    fontFamily: 'Givonic-Bold',
    marginTop: 10,
    marginBottom: 15,
  },
  topProductCardWrapper: {
    // backgroundColor: 'white',
    // borderRadius: 15,
    // paddingVertical: 20,
    // paddingHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    width: '68%',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  description: {
    flex: 1,
  },
  title: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 16,
    color: Colors['black'],
  },
  price: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 16,
    color: Colors['black'],
  },
  totalPriceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // borderWidth: 1,
    // width: '50%',
  },
  totalPriceText: {
    fontFamily: 'Givonic-Bold',
    fontSize: 18,
    color: Colors['black'],
    marginRight: 5,
    // borderWidth: 1,
    width: 90,
    // textAlign: 'center',
  },
});
