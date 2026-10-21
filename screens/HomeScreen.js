import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';

import {
  Page,
  Heading,
  Button,
  ResponsiveGrid,
} from '../components/Shared';

import { CATS, ARTICLES } from '../data/cats';

import styles, {
  COLORS,
} from '../styles/ProjectStyles';

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const wide = width >= 900;

  const menus = [
    {
      id: 'knowledge',
      title: 'มุมทาสแมว',
      description: 'เรื่องน่ารู้สำหรับคนรักแมว',
      emoji: '📖',
      background: '#EDE6FA',
      route: 'Knowledge',
    },
    {
      id: 'breeds',
      title: 'สายพันธุ์แมว',
      description: 'ทำความรู้จักเพื่อนขนฟูทั้ง 25 สายพันธุ์',
      emoji: '🐾',
      background: '#E4F4EC',
      route: 'Breeds',
    },
    {
      id: 'favorites',
      title: 'รายการถูกใจ',
      description: 'กลับมาดูสายพันธุ์ที่คุณบันทึกไว้',
      emoji: '🤍',
      background: '#FCE8EF',
      route: 'Favorites',
    },
    {
      id: 'team',
      title: 'ผู้จัดทำ',
      description: 'สมาชิกและหน้าที่รับผิดชอบ',
      emoji: '🧑‍💻',
      background: '#FFF0DF',
      route: 'Team',
    },
  ];

  return (
    <Page>
      {/* หน้าปกของหน้าหลัก */}
      <View
        style={{
          flexDirection: wide ? 'row' : 'column',
          backgroundColor: COLORS.lavender,
          borderRadius: 28,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#E3D8F4',
          marginTop: 12,
        }}
      >
        <View
          style={{
            width: wide ? '48%' : '100%',
            backgroundColor: '#D9E4D2',
          }}
        >
          <Image
            source={require('../assets/images/persian.jpg')}
            style={{
              width: '100%',
              height: wide ? 380 : 260,
            }}
            resizeMode="cover"
            accessibilityLabel="แมวเปอร์เซีย หน้าปกโลกของแมว"
          />
        </View>

        <View
          style={{
            flex: 1,
            padding: wide ? 32 : 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 12,
              letterSpacing: 2,
              fontWeight: 'bold',
              marginBottom: 12,
            }}
          >
            ยินดีต้อนรับสู่
          </Text>

          <Text style={styles.welcomeTitle}>
            CAT WORLD
          </Text>

          <Text style={styles.welcomeThai}>
            โลกของแมว
          </Text>

          <Text style={styles.welcomeText}>
            ทำความรู้จักเพื่อนขนฟู
            {'\n'}
            ค้นพบสายพันธุ์และเรื่องน่ารู้เกี่ยวกับแมว
          </Text>

          <Button
            title="สำรวจสายพันธุ์แมว 🐾"
            onPress={() =>
              navigation.navigate('Breeds')
            }
          />
        </View>
      </View>

      {/* จำนวนข้อมูล */}
      <View style={styles.stats}>
        <View
          style={[
            styles.stat,
            {
              backgroundColor: '#FFF0DF',
              borderColor: '#F0DCC5',
            },
          ]}
        >
          <Text style={styles.statNumber}>
            {CATS.length}
          </Text>

          <Text style={styles.muted}>
            สายพันธุ์แมว
          </Text>
        </View>

        <View
          style={[
            styles.stat,
            {
              backgroundColor: '#E4F4EC',
              borderColor: '#CAE6D8',
            },
          ]}
        >
          <Text
            style={[
              styles.statNumber,
              { color: COLORS.green },
            ]}
          >
            {ARTICLES.length}
          </Text>

          <Text style={styles.muted}>
            เรื่องน่ารู้
          </Text>
        </View>
      </View>

      <Heading
        title="เริ่มสำรวจโลกของแมว"
        subtitle="เลือกเมนูที่คุณสนใจได้เลย"
      />

      {/* เมนูลัดหน้าแรก */}
      <ResponsiveGrid
        items={menus}
        renderItem={(item) => (
          <Pressable
            onPress={() =>
              navigation.navigate(item.route)
            }
            accessibilityRole="button"
            accessibilityLabel={item.title}
            style={({ pressed }) => ({
              flex: 1,
              minHeight: 210,
              padding: 24,
              borderRadius: 24,
              backgroundColor: item.background,
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text
              style={{
                fontSize: 42,
                marginBottom: 15,
              }}
            >
              {item.emoji}
            </Text>

            <Text style={styles.rowTitle}>
              {item.title}
            </Text>

            <Text
              style={[
                styles.muted,
                { marginTop: 8 },
              ]}
            >
              {item.description}
            </Text>

            <View style={{ flex: 1 }} />

            <Text style={styles.link}>
              เปิดดู →
            </Text>
          </Pressable>
        )}
      />

      <Text style={styles.note}>
        เพื่อนขนฟูแต่ละตัวมีเอกลักษณ์
        {'\n'}
        มาทำความรู้จักพวกเขาไปด้วยกัน 🐱
      </Text>
    </Page>
  );
}