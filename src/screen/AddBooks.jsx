/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';

const AddBook = ({navigation, route}) => {
  const token = route.params?.token;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['Adventure', 'Classics', 'Crime', 'Fantasy'];

  const handleAddBook = async () => {
    // Validate input fields
    if (!title || !description || !author || !price || !category) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }
    if (isNaN(parseFloat(price))) {
      Alert.alert('Validation Error', 'Price must be a number');
      return;
    }

    try {
      const response = await axios.post(
        'https://fragile-gold-tam.cyclic.app/books',
        {
          title,
          description,
          author,
          price: parseFloat(price), // Ensure price is converted to a float
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        },
      );
      console.log('Add book successful:', response.data);
      // Navigate back to the AdminBooks screen after successful add
      navigation.navigate('AdminBooks');
    } catch (error) {
      console.error('Add book failed:', error);
      // Handle error logic here, such as displaying an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Author</Text>
      <TextInput style={styles.input} value={author} onChangeText={setAuthor} />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryContainer}>
        {categories.map((cat, index) => (
          <Button
            key={index}
            title={cat}
            onPress={() => setCategory(cat)}
            color={category === cat ? '#3498db' : '#cccccc'}
          />
        ))}
      </View>
      <Button title="Add Book" onPress={handleAddBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
});

export default AddBook;
