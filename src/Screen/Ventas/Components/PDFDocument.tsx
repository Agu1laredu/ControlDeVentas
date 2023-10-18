import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 12,
  },
});

const PDFDocument = () => {
  return (
    <PDFViewer width={600} height={400}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.text}>ARCHIVED: tus finanzas online</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>
              This is a PDF document generated with @react-pdf/renderer.
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFDocument;
