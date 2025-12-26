import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Styles for PDF
const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#fff', padding: 40 },
  header: { marginBottom: 20, borderBottom: '2px solid #55c57a', paddingBottom: 10 },
  logo: { fontSize: 24, fontWeight: 'bold', color: '#55c57a', letterSpacing: 2 },
  title: { fontSize: 20, marginTop: 20, marginBottom: 10, fontWeight: 'heavy' },
  row: { flexDirection: 'row', marginBottom: 10 },
  label: { width: 100, fontSize: 12, color: '#777' },
  value: { fontSize: 12, fontWeight: 'bold' },
  qrSection: { marginTop: 30, alignItems: 'center', borderTop: '1px dashed #ccc', paddingTop: 20 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 10, color: '#999', textAlign: 'center' }
});

const TicketPDF = ({ tour, user }) => {
  // 1. QR Data create karo (Tour ID + User ID) - Scan karne par ye data dikhega
  const qrData = `Tour: ${tour.name} | User: ${user.name} | ID: ${tour.id}`;
  
  // 2. QR API URL (Ye image Internet se generate hogi)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logo}>NATOURS</Text>
          <Text style={{fontSize: 10, color: '#555'}}>The Forest Hiker Adventure</Text>
        </View>

        {/* BODY */}
        <Text style={styles.title}>Booking Confirmation</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Tour Name:</Text>
          <Text style={styles.value}>{tour.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Traveler:</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Price Paid:</Text>
          <Text style={styles.value}>${tour.price}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
        </View>

        {/* 👇 REAL QR CODE SECTION */}
        <View style={styles.qrSection}>
          <Text style={{fontSize: 10, marginBottom: 10}}>Scan to verify</Text>
          
          {/* Asli Image Tag */}
          <Image 
            src={qrCodeUrl} 
            style={{ width: 100, height: 100 }} 
          />
          
          <Text style={{marginTop: 5, fontSize: 8, color: '#55c57a'}}>
             TICKET ID: #{tour.id.slice(-6).toUpperCase()}
          </Text>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          Thank you for booking with Natours. Please arrive 15 minutes before the scheduled time.
        </Text>

      </Page>
    </Document>
  );
};

export default TicketPDF;