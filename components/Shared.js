import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  useWindowDimensions,
} from 'react-native';

import styles from '../styles/ProjectStyles';

// ========================================
// พื้นที่หน้าจอ รองรับมือถือ แท็บเล็ต และคอม
// ========================================

export function Page({ children }) {
  const { width } = useWindowDimensions();

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View
        style={{
          width: '100%',
          maxWidth: 1160,
          alignSelf: 'center',
          padding: width < 400 ? 14 : 24,
          paddingBottom: 40,
        }}
      >
        {children}
      </View>
    </ScrollView>
  );
}

// ========================================
// จัดจำนวนคอลัมน์ตามพื้นที่หน้าจอ
// ========================================

export function ResponsiveGrid({ items, renderItem }) {
  const { width: windowWidth } = useWindowDimensions();
  const [measuredWidth, setMeasuredWidth] = useState(0);

  const availableWidth =
    measuredWidth ||
    Math.max(0, Math.min(windowWidth - 48, 1112));

  const columns =
    availableWidth >= 1000
      ? 3
      : availableWidth >= 620
        ? 2
        : 1;

  const gap = 16;

  // ปัดลงเล็กน้อย ป้องกันการ์ดเกินแถวจากเศษทศนิยม
  const itemWidth =
    Math.floor(
      Math.max(
        0,
        (availableWidth - gap * (columns - 1)) / columns
      ) * 100
    ) / 100;

  return (
    <View
      onLayout={(event) => {
        const nextWidth = event.nativeEvent.layout.width;

        setMeasuredWidth((previous) =>
          Math.abs(previous - nextWidth) > 1
            ? nextWidth
            : previous
        );
      }}
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap,
        alignItems: 'stretch',
        marginTop: 16,
      }}
    >
      {items.map((item, index) => (
        <View
          key={item.id}
          style={{
            width: itemWidth,
            minWidth: 0,
          }}
        >
          {renderItem(item, index)}
        </View>
      ))}
    </View>
  );
}

// ========================================
// หัวข้อ
// ========================================

export function Heading({ title, subtitle }) {
  return (
    <View style={styles.heading}>
      <Text style={styles.title}>{title}</Text>

      {subtitle ? (
        <Text style={styles.muted}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

// ========================================
// ปุ่ม
// ========================================

export function Button({
  title,
  onPress,
  disabled = false,
}) {
  return (
    <Pressable
      style={[
        styles.button,
        disabled && { opacity: 0.5 },
      ]}
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </Pressable>
  );
}

// ========================================
// รูปแมว รองรับ require() และ URL
// ========================================

export function CatPicture({ uri, emoji = '🐱' }) {
  // รองรับไฟล์ที่ส่งมาเป็นโมดูลแบบ default
  const asset =
    uri && typeof uri === 'object' && uri.default
      ? uri.default
      : uri;

  const source =
    typeof asset === 'string'
      ? asset.trim()
        ? { uri: asset.trim() }
        : null
      : asset;

  return (
    <PictureContent
      key={JSON.stringify(source ?? null)}
      source={source}
      emoji={emoji}
    />
  );
}

function PictureContent({ source, emoji }) {
  const [failed, setFailed] = useState(false);
  const [pictureWidth, setPictureWidth] = useState(0);

  // กำหนดความสูงเป็นตัวเลขตามความกว้างจริง
  const pictureHeight =
    pictureWidth > 0
      ? Math.min(Math.round(pictureWidth * 0.625), 420)
      : 220;

  const hasImage = source !== null && source !== undefined;

  return (
    <View
      onLayout={(event) => {
        const nextWidth = event.nativeEvent.layout.width;

        setPictureWidth((previous) =>
          Math.abs(previous - nextWidth) > 1
            ? nextWidth
            : previous
        );
      }}
      style={{
        width: '100%',
        height: pictureHeight,
        borderRadius: 18,
        backgroundColor: '#E4EBF5',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {hasImage && !failed ? (
        <Image
          source={source}
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          onError={() => setFailed(true)}
          accessibilityLabel="ภาพแมวประกอบ"
        />
      ) : (
        <View style={{ alignItems: 'center', padding: 12 }}>
          <Text style={{ fontSize: 65 }}>
            {emoji}
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: '#64748B',
              marginTop: 8,
              textAlign: 'center',
            }}
          >
            {failed
              ? 'โหลดรูปไม่สำเร็จ'
              : 'ยังไม่ได้ใส่รูป'}
          </Text>
        </View>
      )}
    </View>
  );
}

// ========================================
// การ์ดสายพันธุ์แมว
// ========================================

export function CatCard({ item, navigation }) {
  return (
    <Pressable
      style={[
        styles.catCard,
        {
          marginTop: 0,
          flex: 1,
        },
      ]}
      onPress={() =>
        navigation.navigate('CatDetail', { item })
      }
      accessibilityRole="button"
      accessibilityLabel={`ดูรายละเอียด${item.name}`}
    >
      <CatPicture
        uri={item.image}
        emoji={item.emoji}
      />

      <View
        style={[
          styles.cardBody,
          { flex: 1 },
        ]}
      >
        <Text style={styles.label}>
          {item.coat}
        </Text>

        <Text style={styles.cardTitle}>
          {item.name}
        </Text>

        <Text style={styles.english}>
          {item.english}
        </Text>

        <Text style={styles.muted}>
          {item.description}
        </Text>

        <View style={{ flex: 1 }} />

        <Text style={styles.link}>
          ดูรายละเอียด ›
        </Text>
      </View>
    </Pressable>
  );
}