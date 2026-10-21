import React from 'react';
import { View, Text } from 'react-native';

import { Page, Heading } from '../components/Shared';
import styles from '../styles/ProjectStyles';

export default function ArticleDetailScreen({ route }) {
  const item = route.params?.item;

  if (!item) {
    return (
      <Page>
        <Heading title="ไม่พบเนื้อหา" />
      </Page>
    );
  }

  return (
    <Page>
      <Text style={styles.articleEmoji}>
        {item.emoji}
      </Text>

      <Heading title={item.title} />

      <View style={styles.detailBox}>
        <Text style={styles.section}>
          รายละเอียด
        </Text>

        <Text style={styles.paragraph}>
          {item.content}
        </Text>
      </View>
    </Page>
  );
}