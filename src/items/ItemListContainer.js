// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchItems } from '../features/products/productsSlice';
// import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
// import ItemList from './ItemList';

// const ItemListContainer = () => {
//   const dispatch = useDispatch();
//   const { items, genres, loading, error } = useSelector(state => state.products);

//   useEffect(() => {
//     dispatch(fetchItems());
//   }, [dispatch]);

//   if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
//   if (error) return <Text>Error: {error}</Text>;

//   return (
//     <View style={styles.container}>
      
//       <FlatList style={styles.containerList}
//       ListHeaderComponent={<Text style={styles.header}>Productos</Text>}
//         data={items}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => <ItemList product={item} />}
//       />

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 6,
//     backgroundColor:'#dcdcdc',
//     height:'100%',
//   },
//   containerList: {
//     padding: 1,
//     backgroundColor:'#dcdcdc',
//     borderRadius:8,

//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   genre: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     marginBottom: 5,
//   },
// });

// export default ItemListContainer;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../features/products/productsSlice';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import ItemList from './ItemList';

const ItemListContainer = ({ productos }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    if (!productos) {
      dispatch(fetchItems());
    }
  }, [dispatch, productos]);

  const dataToRender = productos || items;

  if (loading && !productos) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error && !productos) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.containerList}
        ListHeaderComponent={<Text style={styles.header}>Productos</Text>}
        data={dataToRender}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ItemList product={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    backgroundColor: '#dcdcdc',
    height: '100%',
  },
  containerList: {
    padding: 1,
    backgroundColor: '#dcdcdc',
    borderRadius: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default ItemListContainer;
