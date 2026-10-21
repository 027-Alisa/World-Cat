import React from 'react';
import { View, Text } from 'react-native';

import {
  Page,
  ResponsiveGrid,
} from '../components/Shared';

import styles, {
  COLORS,
} from '../styles/ProjectStyles';

export default function TeamScreen() {
  const members = [
    {
      id: 'M01',
      name: 'นายนฤสรณ์ อีสา',
      studentId: '368305221010',
      classroom: 'ISD36821N',
      role: 'วางแผนและออกแบบแอป',
    },
    {
      id: 'M02',
      name: 'นางสาวรุจิรา กาฬภักดี',
      studentId: '368305221018',
      classroom: 'ISD36821N',
      role: 'พัฒนาแอปและจัดเตรียมข้อมูล',
    },
    {
      id: 'M03',
      name: 'นางสาวอลิสา ทองอินศรี',
      studentId: '368305221027',
      classroom: 'ISD36821N',
      role: 'ทดสอบแอปและจัดทำรายงาน',
    },
  ];

  return (
    <Page>
      <View style={styles.teamHeading}>
        <Text style={styles.welcomeTitle}>
          OUR TEAM
        </Text>

        <Text style={styles.muted}>
          สมาชิกผู้จัดทำโครงงาน
        </Text>
      </View>

      <ResponsiveGrid
        items={members}
        renderItem={(member, index) => (
          <View
            style={[
              styles.detailBox,
              {
                marginTop: 0,
                height: '100%',
                alignItems: 'center',
                paddingVertical: 28,
              },
            ]}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: COLORS.dark,
                textAlign: 'center',
                marginBottom: 18,
              }}
            >
              สมาชิกคนที่ {index + 1}
            </Text>

            <Text
              style={{
                fontSize: 50,
                marginBottom: 18,
              }}
            >
              🧑‍💻
            </Text>

            <Text
              style={[
                styles.rowTitle,
                {
                  textAlign: 'center',
                  marginBottom: 12,
                },
              ]}
            >
              {member.name}
            </Text>

            <Text
              style={[
                styles.studentId,
                { textAlign: 'center' },
              ]}
            >
              รหัสนักศึกษา: {member.studentId}
            </Text>

            <Text
              style={[
                styles.paragraph,
                {
                  textAlign: 'center',
                  marginTop: 8,
                },
              ]}
            >
              ห้องเรียน: {member.classroom}
            </Text>

            <View
              style={{
                width: '100%',
                backgroundColor: '#E8F3E9',
                borderRadius: 14,
                padding: 16,
                marginTop: 18,
              }}
            >
           
              <Text
                style={[
                  styles.muted,
                  { textAlign: 'center' },
                ]}
              >
                {member.role}
              </Text>
            </View>
          </View>
        )}
      />

      <Text style={styles.note}>
        ร่วมกันพัฒนาแอป CAT WORLD · โลกของแมว 🐾
      </Text>
    </Page>
  );
}