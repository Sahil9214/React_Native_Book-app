/* eslint-disable prettier/prettier */
import React, {useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import axios from 'axios';
import Button from '../components/Button';

const AdminBooks = ({navigation, route}) => {
  const token = route.params?.token;

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
    navigation.navigate('AddBooks', {
      token: token,
    });
  };

  const handleDelete = async id => {
    console.log('id', id);
    try {
      let res = await axios.delete(
        `https://fragile-gold-tam.cyclic.app/books/${id}`,
      );
      Alert.alert('Book Deleted Successfully');
      // After deleting the book, fetch updated data
      fetchData();
    } catch (error) {
      console.log('err', error);
    }
  };

  const handleUpdate = async id => {
    navigation.navigate('UpdateBook', {
      bookId: id,
      token: token,
    });
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {books.map(book => (
        <View style={styles.bookContainer} key={book._id}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>by {book.author}</Text>
          <Text style={styles.description}>{book.description}</Text>
          <Text style={styles.price}>Price: ${book.price}</Text>
          <Text style={styles.category}>Category: {book.category}</Text>
          <View style={styles.addContainer}>
            <Button title={'Add Books'} onPress={handlePress} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title={'Delete'} onPress={() => handleDelete(book._id)} />
            <Button title={'Update'} onPress={() => handleUpdate(book._id)} />
          </View>
        </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addContainer: {
    marginTop: 20,
  },
});

export default AdminBooks;
