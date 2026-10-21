import React from 'react';
import { View, Text } from 'react-native';

import {
  Page,
  Heading,
  Button,
  CatPicture,
} from '../components/Shared';

import { useFavorites } from '../context/FavoriteContext';
import styles from '../styles/ProjectStyles';

export default function CatDetailScreen({ route }) {
  const item = route.params?.item;
  const { favorites, toggleFavorite } = useFavorites();

  if (!item) {
    return (
      <Page>
        <Heading title="ไม่พบข้อมูลสายพันธุ์" />
      </Page>
    );
  }

  const saved = favorites.includes(item.id);

  return (
    <Page>
      <CatPicture
        uri={item.image}
        emoji={item.emoji}
      />

      <Heading
        title={item.name}
        subtitle={item.english}
      />

      <Text style={styles.label}>{item.coat}</Text>

      <Text style={styles.paragraph}>
        {item.description}
      </Text>

      <Button
        title={
          saved
            ? '♥ ยกเลิกถูกใจ'
            : '♡ บันทึกสายพันธุ์ที่ถูกใจ'
        }
        onPress={() => toggleFavorite(item.id)}
      />

      <View style={styles.detailBox}>
        <Text style={styles.section}>
          ลักษณะเด่น
        </Text>

        <Text style={styles.paragraph}>
          {item.appearance}
        </Text>

        <Text style={styles.section}>
          บุคลิกโดยทั่วไป
        </Text>

        <Text style={styles.paragraph}>
          {item.personality}
        </Text>

        <Text style={styles.section}>
          การจัดพื้นที่
        </Text>

        <Text style={styles.paragraph}>
          {item.detail}
        </Text>
      </View>

      <Text style={styles.note}>
        แมวแต่ละตัวมีนิสัยและความชอบต่างกัน
      </Text>
    </Page>
  );
}