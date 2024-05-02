import React from 'react';
// import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4',
//     padding: 10,
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

const AssignmentPDF = ({ assignment }) => {
  return (
    <PDFViewer width="1000" height="600">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Title: {assignment.title}</Text>
            <Text>Type: {assignment.type}</Text>
            <Text>Subtype: {assignment.subType}</Text>
            <Text>Deadline: {assignment.deadline}</Text>
            <Text>Description: {assignment.description}</Text>
            <Text>Created By: {assignment.user}</Text>
            <Text>Role: {assignment.role}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default AssignmentPDF;