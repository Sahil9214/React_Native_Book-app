/* eslint-disable prettier/prettier */
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import axios from 'axios';
import Button from '../components/Button';

const AllBooks = ({navigation}) => {
  // Ensure that AllBooks receives navigation object as a prop
  const [books, setBooks] = useState([]);

  async function fetchData() {
    try {
      let res = await axios.get('https://fragile-gold-tam.cyclic.app/books');
      setBooks(res.data);
    } catch (err) {
      console.log('err', err);
    }
  }

  const handlePress = () => {
    navigation.navigate('Signup');
  };
  const handlePressBook = () => {
    Alert.alert(
      'Please Login First',
      'Click on a book to sign up and add it to your collection.',
    );
  };
  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {books.map(book => (
        <Pressable
          key={book._id}
          style={styles.bookContainer}
          onPress={handlePress}>
          <View>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>by {book.author}</Text>
            <Text style={styles.description}>{book.description}</Text>
            <Text style={styles.price}>Price: ${book.price}</Text>
            <Text style={styles.category}>Category: {book.category}</Text>
          </View>
          <Button
            title={'AddBooks'}
            onPress={handlePressBook}
            style={styles.btn}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  bookContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontStyle: 'italic',
    color: 'blue',
  },
  btn: {
    marginTop: 10, // Adjusted marginTop value here
  },
});

export default AllBooks;
