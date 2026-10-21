import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';

import {
  Page,
  CatCard,
  ResponsiveGrid,
} from '../components/Shared';

import { CATS } from '../data/cats';

import styles, {
  COLORS,
} from '../styles/ProjectStyles';

export default function BreedsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [coat, setCoat] = useState('ทั้งหมด');

  const filtered = CATS.filter((item) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.english.toLowerCase().includes(query);

    const matchesCoat =
      coat === 'ทั้งหมด' || item.coat === coat;

    return matchesSearch && matchesCoat;
  });

  return (
    <Page>
      <View style={styles.blueBanner}>
        <Text style={styles.title}>
          รู้จักสายพันธุ์แมว
        </Text>

        <Text style={styles.muted}>
          ค้นหาเพื่อนขนฟูที่คุณสนใจ
        </Text>

        <Text style={styles.label}>
          ทั้งหมด {CATS.length} สายพันธุ์
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="ค้นหาชื่อไทยหรือภาษาอังกฤษ..."
        value={search}
        onChangeText={setSearch}
        accessibilityLabel="ค้นหาสายพันธุ์แมว"
        autoCorrect={false}
      />

      <View style={styles.chips}>
        {['ทั้งหมด', 'ขนสั้น', 'ขนยาว'].map(
          (item) => (
            <Pressable
              key={item}
              style={[
                styles.chip,
                coat === item && styles.activeChip,
              ]}
              onPress={() => setCoat(item)}
            >
              <Text
                style={{
                  color:
                    coat === item
                      ? '#FFFFFF'
                      : COLORS.dark,
                }}
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <Text style={styles.muted}>
        พบ {filtered.length} สายพันธุ์
      </Text>

      <ResponsiveGrid
        items={filtered}
        renderItem={(item) => (
          <CatCard
            item={item}
            navigation={navigation}
          />
        )}
      />

      {filtered.length === 0 && (
        <View style={styles.empty}>
          <Text style={{ fontSize: 48 }}>🔎</Text>

          <Text style={styles.cardTitle}>
            ไม่พบสายพันธุ์
          </Text>

          <Text style={styles.muted}>
            ลองเปลี่ยนคำค้นหรือเลือกหมวดอื่น
          </Text>
        </View>
      )}
    </Page>
  );
}