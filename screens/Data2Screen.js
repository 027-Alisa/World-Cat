import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Modal,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import topics from "../data/react_native_knowledge_24_topics";

// แสดงภาพเต็มรูป พร้อมภาพสำรองเมื่อโหลดไม่ได้
function TopicImage({ source }) {
  const [failed, setFailed] = useState(false);

  return (
    <View style={styles.imageBox}>
      {source != null && !failed ? (
        <Image
          source={source}
          style={styles.image}
          resizeMode="contain"
          onError={() => setFailed(true)}
          accessibilityLabel="ภาพประกอบความรู้ React Native"
        />
      ) : (
        <Text style={styles.placeholder}>📚</Text>
      )}
    </View>
  );
}

// แสดงข้อความทั้งแบบข้อความและอาร์เรย์
function DetailSection({ title, value, code = false }) {
  const text = Array.isArray(value)
    ? value.map((item) => `• ${item}`).join("\n")
    : value;

  if (typeof text !== "string" || !text.trim()) {
    return null;
  }

  return (
    <View style={styles.detailSection}>
      <Text style={styles.detailLabel}>{title}</Text>

      <Text
        selectable
        style={code ? styles.codeText : styles.detailText}
      >
        {text}
      </Text>
    </View>
  );
}

export default function Data2Screen() {
  const { width, fontScale } = useWindowDimensions();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [layoutWidth, setLayoutWidth] = useState(0);

  const pageWidth = Math.min(layoutWidth || width, 1180);
  const padding = pageWidth < 400 ? 14 : 24;
  const contentWidth = Math.max(0, pageWidth - padding * 2);
  const scale = Math.max(1, fontScale);

  const columns =
    contentWidth >= 960 * scale
      ? 3
      : contentWidth >= 620 * scale
        ? 2
        : 1;

  const gap = 16;
  const cardWidth = Math.max(
    0,
    (contentWidth - gap * (columns - 1)) / columns
  );

  const filteredTopics = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return topics.filter((item) =>
      [
        item.id,
        item.topic,
        item.category,
        item.summary,
        ...(item.keywords || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [search]);

  const closeDetails = () => setSelected(null);

  return (
    <SafeAreaView
      style={styles.screen}
      edges={["left", "right", "bottom"]}
      onLayout={(event) => {
        const nextWidth = event.nativeEvent.layout.width;

        setLayoutWidth((previous) =>
          Math.abs(previous - nextWidth) > 1
            ? nextWidth
            : previous
        );
      }}
    >
      <FlatList
        key={`grid-${columns}`}
        style={styles.list}
        data={filteredTopics}
        numColumns={columns}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={[
          styles.listContent,
          { paddingHorizontal: padding },
        ]}
        ListHeaderComponent={
          <View>
            <View style={styles.hero}>
              <Text style={styles.heroLabel}>
                LEARN SOMETHING NEW
              </Text>

              <Text style={styles.heroTitle}>
                มุมความรู้{"\n"}React Native ✨
              </Text>

              <Text style={styles.heroSubtitle}>
                เรียนรู้พื้นฐานการสร้างแอป
                พร้อมภาพประกอบและตัวอย่างโค้ด
              </Text>

              <Text style={styles.totalBadge}>
                📚 ทั้งหมด {topics.length} หัวข้อ
              </Text>
            </View>

            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>🔎</Text>

              <TextInput
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
                placeholder="ค้นหาหัวข้อหรือคำสำคัญ"
                placeholderTextColor="#9692AA"
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="ค้นหาหัวข้อความรู้"
              />

              {search.length > 0 && (
                <Pressable
                  onPress={() => setSearch("")}
                  style={styles.clearButton}
                  accessibilityRole="button"
                  accessibilityLabel="ล้างคำค้นหา"
                >
                  <Text style={styles.clearText}>✕</Text>
                </Pressable>
              )}
            </View>

            <View style={styles.sectionHeading}>
              <Text style={styles.sectionTitle}>
                {search.trim() ? "ผลการค้นหา" : "หัวข้อทั้งหมด"}
              </Text>

              <Text style={styles.muted}>
                {filteredTopics.length} หัวข้อ
              </Text>
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => setSelected(item)}
            accessibilityRole="button"
            accessibilityLabel={`อ่านเรื่อง ${item.topic}`}
            style={({ pressed }) => [
              styles.card,
              {
                width: cardWidth,
                marginRight:
                  (index + 1) % columns === 0 ? 0 : gap,
              },
              pressed && { opacity: 0.75 },
            ]}
          >
            <TopicImage
              key={item.id}
              source={item.image}
            />

            <View style={styles.cardBody}>
              <View style={styles.badgeRow}>
                <Text style={styles.badge}>{item.id}</Text>
                <Text style={styles.category}>
                  {item.category}
                </Text>
              </View>

              <Text style={styles.cardTitle}>
                {item.topic}
              </Text>

              <Text style={styles.summary} numberOfLines={3}>
                {item.summary}
              </Text>

              <View style={styles.cardFooter}>
                <Text style={styles.readMore}>
                  อ่านรายละเอียด
                </Text>
                <Text style={styles.readMore}>↗</Text>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.cardTitle}>
              ไม่พบหัวข้อที่ค้นหา
            </Text>
            <Text style={styles.muted}>
              ลองเปลี่ยนคำค้นหาหรือกดล้างคำค้นหา
            </Text>
          </View>
        }
        ListFooterComponent={
          <Text style={styles.footer}>
            เรียนรู้ทีละนิด แล้วสร้างแอปในแบบของคุณ 💜
          </Text>
        }
      />

      <Modal
        visible={selected !== null}
        transparent
        animationType="fade"
        onRequestClose={closeDetails}
      >
        <SafeAreaView style={styles.overlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeading}>
                รายละเอียดหัวข้อ
              </Text>

              <Pressable
                onPress={closeDetails}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel="ปิดรายละเอียด"
              >
                <Text style={styles.readMore}>✕</Text>
              </Pressable>
            </View>

            <ScrollView
              style={styles.list}
              contentContainerStyle={styles.modalContent}
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}
            >
              {selected && (
                <>
                  <TopicImage
                    key={selected.id}
                    source={selected.image}
                  />

                  <Text style={styles.detailCategory}>
                    {selected.id} · {selected.category}
                  </Text>

                  <Text style={styles.detailTitle}>
                    {selected.topic}
                  </Text>

                  <DetailSection
                    title="สรุป"
                    value={selected.summary}
                  />

                  <DetailSection
                    title="แนวคิด"
                    value={selected.concept}
                  />

                  <DetailSection
                    title="วัตถุประสงค์"
                    value={selected.purpose}
                  />

                  <DetailSection
                    title="ตัวอย่างโค้ด"
                    value={selected.code_example}
                    code
                  />

                  <DetailSection
                    title="คำอธิบาย"
                    value={selected.explanation}
                  />

                  <DetailSection
                    title="การประยุกต์ใช้"
                    value={selected.application}
                  />

                  <DetailSection
                    title="เนื้อหาเพิ่มเติม"
                    value={selected.content}
                  />

                  <DetailSection
                    title="คำสำคัญ"
                    value={selected.keywords}
                  />
                </>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F5FF",
  },
  list: {
    flex: 1,
  },
  listContent: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    paddingTop: 18,
    paddingBottom: 32,
  },
  hero: {
    backgroundColor: "#E8E1FF",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#DDD2FF",
  },
  heroLabel: {
    color: "#6554C0",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 12,
  },
  heroTitle: {
    color: "#272343",
    fontSize: 29,
    fontWeight: "800",
  },
  heroSubtitle: {
    color: "#635C7C",
    fontSize: 15,
    marginTop: 12,
  },
  totalBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 10,
    marginTop: 18,
    color: "#6554C0",
    fontWeight: "700",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E5F5",
    paddingHorizontal: 12,
    marginTop: 18,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 16,
    fontSize: 15,
    color: "#272343",
  },
  clearButton: {
    padding: 12,
  },
  clearText: {
    color: "#74748C",
    fontSize: 16,
  },
  sectionHeading: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#272343",
    marginRight: 12,
  },
  muted: {
    fontSize: 13,
    color: "#74748C",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E8E5F5",
    overflow: "hidden",
    marginBottom: 16,
  },
  imageBox: {
    width: "100%",
    aspectRatio: 16 / 10,
    backgroundColor: "#EEEBFA",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    fontSize: 50,
  },
  cardBody: {
    flexGrow: 1,
    padding: 18,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  badge: {
    backgroundColor: "#EEE9FF",
    color: "#6554C0",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 8,
  },
  category: {
    flex: 1,
    color: "#74748C",
    fontSize: 12,
  },
  cardTitle: {
    color: "#272343",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  summary: {
    color: "#716D85",
    fontSize: 14,
    marginBottom: 18,
  },
  cardFooter: {
    marginTop: "auto",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0EDF8",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  readMore: {
    color: "#6554C0",
    fontSize: 15,
    fontWeight: "700",
  },
  empty: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignItems: "center",
    padding: 28,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 14,
  },
  footer: {
    textAlign: "center",
    fontSize: 13,
    color: "#74748C",
    paddingVertical: 14,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(27,23,48,0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalCard: {
    width: "100%",
    maxWidth: 760,
    height: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E5F5",
  },
  modalHeading: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#272343",
  },
  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EEE9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    padding: 20,
    paddingBottom: 36,
  },
  detailCategory: {
    color: "#6554C0",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  detailTitle: {
    color: "#272343",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailLabel: {
    color: "#6554C0",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  detailText: {
    color: "#625D75",
    fontSize: 16,
  },
  codeText: {
    backgroundColor: "#F0EDF8",
    color: "#34304C",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
  },
});