import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';

const backgroundImage = require('../../../assets/images/background.png'); // Local image

const StudentHomePage = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const messTimetable = [
    {
      day: 'Monday',
      breakfast: '1. Idly(4)\n2. Palli Chutney\n3. Boiled Egg\n4. Milk',
      lunch: '1. Rice\n2. Thotakura/Palakura Pappu\n3. Alu Fry\n4. Rasam\n5. Curd\n6. Banana',
      dinner: '1. Rice\n2. Vankaya Batani Curry\n3. Sambar\n4. Roti Chutney Cabbage\n5. Curd',
    },
    {
      day: 'Tuesday',
      breakfast: '1. Lemon/Tamarind Rice/Pongal\n2. Katta/Sambar\n3. Boiled Egg\n4. Milk',
      lunch: '1. Rice\n2. Tomoto Pappu\n3. Dondakaya Fry\n4. Rasam\n5. Curd\n6. Banana',
      dinner: '1. Rice\n2. Beerakaya Curry\n3. Sambar\n4. Tomoto Chutney\n5. Curd',
    },
    {
      day: 'Wednesday',
      breakfast: '1. Upma/Semya Upma\n2. Palli/Putnala Chutney\n3. Milk',
      lunch: '1. Rice\n2. Chicken & Paneer\n3. Sweet\n4. Banana\n5. Curd',
      dinner: '1. Rice\n2. Bendakaya Curry\n3. Sambar\n4. Mango Chutney\n5. Curd',
    },
    {
      day: 'Thursday',
      breakfast: '1. Vada (3 No’s)\n2. Palli Chutney\n3. Boiled Egg\n4. Milk',
      lunch: '1. Rice\n2. Dosakaya Pappu\n3. Cabbage Fry\n4. Rasam\n5. Curd\n6. Banana',
      dinner: '1. Rice\n2. Chikkudukay/Beans Curry\n3. Sambar\n4. Lemon Pickle\n5. Curd',
    },
    {
      day: 'Friday',
      breakfast: '1. Onion Uthappam\n2. Palli Chutney\n3. Boiled Egg\n4. Milk',
      lunch: '1. Rice\n2. Sorakaya Pesarapappu\n3. Beetroot/Carrot Fry\n4. Rasam\n5. Curd\n6. Banana',
      dinner: '1. Rice\n2. Alu Dum Fry\n3. Sambar\n4. Roti Chutney (Dondakaya)\n5. Curd',
    },
    {
      day: 'Saturday',
      breakfast: '1. Mysore Bajji (4)\n2. Palli Chutney\n3. Boiled Egg\n4. Milk',
      lunch: '1. Rice\n2. Mudda Pappu\n3. Pachi Pulusu\n4. Avakaya Pickle\n5. Papad\n6. Banana\n7. Curd',
      evening_snacks: '1. Atukulu (Chuduva)\n2. Tea',
      dinner: '1. Rice\n2. Mixed Veg Fry (Alu+Carrot+Beans)\n3. Sambar\n4. Gongura Chutney\n5. Curd',
    },
    {
      day: 'Sunday',
      breakfast: '1. Chapathi\n2. Alukurma\n3. Milk',
      lunch: '1. Veg Biryani Rice\n2. Chicken & Gutti Vankaya Curry\n3. Rytha\n4. Sambar\n5. Sweet',
      evening_snacks: '1. Milk Biscuits (4)\n2. Tea',
      dinner: '1. Rice\n2. Dosakaya Chutney\n3. Sambar\n4. Banana\n5. Curd',
    },
  ];

  const renderCard = ({ item }) => (
    <Animatable.View animation="fadeInUp" style={styles.card}>
      <Text style={styles.cardTitle}>{item.day}</Text>
      <Text style={styles.cardMealTitle}>Breakfast:</Text>
      <Text style={styles.cardMeal}>{item.breakfast}</Text>
      <Text style={styles.cardMealTitle}>Lunch:</Text>
      <Text style={styles.cardMeal}>{item.lunch}</Text>
      <Text style={styles.cardMealTitle}>Dinner:</Text>
      <Text style={styles.cardMeal}>{item.dinner}</Text>
    </Animatable.View>
  );

  return (
    <FlatList
      data={messTimetable}
      renderItem={renderCard}
      keyExtractor={(item) => item.day}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Image source={require('../../../assets/images/rgulogo2.png')} style={styles.logoImage} />
            </View>
          </View>

          <Text style={styles.tableHeader}>Mess Timetable</Text>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e3f2fd',
  },
  logoContainer: {
    position: 'absolute', // Position the logo in the top-left
    top: -13, // Distance from the top
    left: 5, // Distance from the left
    width: 50, // Reduced width
    height: 50, // Reduced height
    backgroundColor: '#2196f3',
    borderRadius: 35, // Half of width/height for circular shape
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1, // Ensure the logo is above other content
  },
  logo: {
    top: 3,
    width: 50, // Adjusted inner logo width
    height: 50, // Adjusted inner logo height
    alignItems: 'center',
    borderRadius: 25,
  },
  logoImage: {
    width: 45, // Adjusted logo image size
    height: 45,
    borderRadius: 25,
  },

  tableHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0d47a1',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196f3',
    marginBottom: 5,
  },
  cardMealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardMeal: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
});

export default StudentHomePage;
