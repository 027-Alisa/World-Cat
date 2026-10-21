import React from 'react';
import { View, Text } from 'react-native';

import { Page, Heading } from '../components/Shared';
import styles from '../styles/ProjectStyles';

export default function HowToScreen() {
  const instructions = [
    'หน้าหลัก: ดูภาพแนะนำและเลือกเมนูลัด',
    'สาระน่ารู้: กดหัวข้อเพื่ออ่านรายละเอียด',
    'สายพันธุ์: ค้นหาชื่อภาษาไทยหรือภาษาอังกฤษ',
    'เลือกขนสั้นหรือขนยาวเพื่อกรองรายการ',
    'กดการ์ดสายพันธุ์เพื่อเปิดรายละเอียด',
    'กดบันทึกถูกใจเพื่อเพิ่มรายการ',
    'เปิดรายการถูกใจจากเมนูด้านข้าง ☰ หรือปุ่มลัดหน้าแรก',
    'ผู้จัดทำ: ดูสมาชิกและหน้าที่รับผิดชอบ',
    'กดลูกศรย้อนกลับเพื่อกลับหน้ารายการ',
  ];

  return (
    <Page>
      <Heading
        title="วิธีใช้งาน"
        subtitle="เริ่มสำรวจโลกของแมว"
      />

      {instructions.map((item, index) => (
        <View
          key={item}
          style={styles.menuRow}
        >
          <View style={styles.numberCircle}>
            <Text style={styles.number}>
              {index + 1}
            </Text>
          </View>

          <Text
            style={[styles.paragraph, styles.flex]}
          >
            {item}
          </Text>
        </View>
      ))}
    </Page>
  );
}