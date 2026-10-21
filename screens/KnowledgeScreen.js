import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import {
  Page,
  ResponsiveGrid,
} from '../components/Shared';

import { ARTICLES } from '../data/cats';
import { COLORS } from '../styles/ProjectStyles';

const THEMES = [
  {
    background: '#FFF0DF',
    accent: '#995728',
    badge: '#FFE1BD',
  },
  {
    background: '#EDE6FA',
    accent: '#6846A3',
    badge: '#DDD0F5',
  },
  {
    background: '#E4F4EC',
    accent: '#28684E',
    badge: '#C9E9D8',
  },
  {
    background: '#FCE8EF',
    accent: '#9A4264',
    badge: '#F7D0DF',
  },
  {
    background: '#E6EFFD',
    accent: '#3D609A',
    badge: '#CDDDF8',
  },
  {
    background: '#FFF5D9',
    accent: '#85621D',
    badge: '#F8E7AD',
  },
];

export default function KnowledgeScreen({ navigation }) {
  return (
    <Page>
      {/* แบนเนอร์ */}
      <View style={local.banner}>
        <View style={local.bannerTop}>
          <View style={local.brandBadge}>
            <Text style={local.brandText}>
              CAT WORLD
            </Text>
          </View>

          <Text style={local.bannerPaw}>🐾</Text>
        </View>

        <Text style={local.title}>
          มุมทาสแมว
        </Text>

        <Text style={local.subtitle}>
          เข้าใจเจ้าเหมียวให้มากขึ้น
          {'\n'}
          ผ่านเรื่องน่ารู้ที่อ่านง่ายและใกล้ตัว
        </Text>

        <View style={local.countBadge}>
          <Text style={local.countText}>
            📖 ทั้งหมด {ARTICLES.length} เรื่อง
          </Text>
        </View>
      </View>

      {/* หัวข้อรายการ */}
      <View style={local.listHeading}>
        <Text style={local.listTitle}>
          วันนี้อยากรู้เรื่องอะไร?
        </Text>

        <Text style={local.listSubtitle}>
          เลือกการ์ดเพื่ออ่านต่อ
        </Text>
      </View>

      {/* การ์ดบทความ */}
      <ResponsiveGrid
        items={ARTICLES}
        renderItem={(item, index) => {
          const theme =
            THEMES[index % THEMES.length];

          return (
            <Pressable
              onPress={() =>
                navigation.navigate('ArticleDetail', {
                  item,
                })
              }
              accessibilityRole="button"
              accessibilityLabel={`อ่านเรื่อง ${item.title}`}
              style={({ pressed }) => [
                local.card,
                {
                  backgroundColor: theme.background,
                  opacity: pressed ? 0.8 : 1,
                  transform: [
                    { scale: pressed ? 0.98 : 1 },
                  ],
                },
              ]}
            >
              <View style={local.cardTop}>
                <View
                  style={[
                    local.emojiBox,
                    { backgroundColor: theme.badge },
                  ]}
                >
                  <Text style={local.emoji}>
                    {item.emoji}
                  </Text>
                </View>

                <Text
                  style={[
                    local.number,
                    { color: theme.accent },
                  ]}
                >
                  {String(index + 1).padStart(2, '0')}
                </Text>
              </View>

              <Text
                style={[
                  local.cardLabel,
                  { color: theme.accent },
                ]}
              >
                เรื่องน่ารู้ของเจ้าเหมียว
              </Text>

              <Text style={local.cardTitle}>
                {item.title}
              </Text>

              <Text
                style={local.preview}
                numberOfLines={3}
              >
                {item.content.split('\n')[0]}
              </Text>

              <View style={{ flex: 1 }} />

              <View style={local.cardFooter}>
                <Text
                  style={[
                    local.readText,
                    { color: theme.accent },
                  ]}
                >
                  เปิดอ่านเรื่องนี้
                </Text>

                <View
                  style={[
                    local.arrowBox,
                    { backgroundColor: theme.badge },
                  ]}
                >
                  <Text
                    style={[
                      local.arrow,
                      { color: theme.accent },
                    ]}
                  >
                    →
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />

      <View style={local.bottomNote}>
        <Text style={{ fontSize: 24 }}>🐈</Text>

        <Text style={local.bottomText}>
          รู้จักแมวมากขึ้น วันละนิด
          {'\n'}
          แล้วคุณจะเข้าใจเพื่อนขนฟูมากกว่าเดิม
        </Text>
      </View>
    </Page>
  );
}

const local = StyleSheet.create({
  banner: {
    backgroundColor: '#EDE6FA',
    borderRadius: 28,
    padding: 26,
    borderWidth: 1,
    borderColor: '#DDD0F0',
  },

  bannerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  brandBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
  },

  brandText: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: COLORS.primary,
  },

  bannerPaw: {
    fontSize: 35,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 28,
    color: '#665479',
  },

  countBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 14,
    marginTop: 18,
  },

  countText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  listHeading: {
    marginTop: 28,
    marginBottom: 4,
  },

  listTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.dark,
  },

  listSubtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 7,
  },

  card: {
    flex: 1,
    minHeight: 300,
    padding: 23,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  emojiBox: {
    width: 64,
    height: 64,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emoji: {
    fontSize: 34,
  },

  number: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  cardLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  cardTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 31,
    color: COLORS.dark,
    marginBottom: 12,
  },

  preview: {
    fontSize: 15,
    color: '#645C6E',
    lineHeight: 25,
  },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 22,
  },

  readText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },

  arrowBox: {
    width: 38,
    height: 38,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrow: {
    fontSize: 23,
    fontWeight: 'bold',
  },

  bottomNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#E4F4EC',
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
  },

  bottomText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 25,
    color: '#38634F',
  },
});