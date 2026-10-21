import React from 'react';
import { View, Text } from 'react-native';

import {
  Page,
  Heading,
  Button,
  CatCard,
  ResponsiveGrid,
} from '../components/Shared';

import { useFavorites } from '../context/FavoriteContext';
import { CATS } from '../data/cats';
import styles from '../styles/ProjectStyles';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();

  const savedCats = CATS.filter((item) =>
    favorites.includes(item.id)
  );

  function goToBreeds() {
    navigation.navigate('MainTabs', {
      screen: 'Breeds',
    });
  }

  return (
    <Page>
      <Heading
        title="สายพันธุ์ที่ถูกใจ"
        subtitle={`บันทึกไว้ ${savedCats.length} สายพันธุ์`}
      />

      {savedCats.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.bigEmoji}>🤍</Text>

          <Text style={styles.cardTitle}>
            ยังไม่มีรายการถูกใจ
          </Text>

          <Text style={styles.muted}>
            เปิดรายละเอียดแมวแล้วกดปุ่มถูกใจ
          </Text>

          <Button
            title="ไปดูสายพันธุ์แมว"
            onPress={goToBreeds}
          />
        </View>
      ) : (
        <ResponsiveGrid
          items={savedCats}
          renderItem={(item) => (
            <CatCard
              item={item}
              navigation={navigation}
            />
          )}
        />
      )}

      <Text style={styles.note}>
        รายการถูกใจเก็บไว้ระหว่างเปิดแอปครั้งนี้
      </Text>
    </Page>
  );
}