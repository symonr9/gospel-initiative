import { StyleSheet, Image, Platform } from 'react-native';

export const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16
  }
});

export const cardStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 6,
    backgroundColor: '#fff',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 4, // Shadow for Android
    borderRadius: 4,
  },
  section: {
    paddingBottom: 8,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
    marginVertical: 4,
  },
});

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  slimTextInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  multiLineTextInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlignVertical: 'top', // Ensures the text starts at the top for multiline
    height: 120,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  checkbox: {
    marginRight: 8,
  },
});

export const flexStyles = StyleSheet.create({
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export const tabStyles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

export const gridStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
  },
  itemCard: {
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 8,
    padding: 8,
    gap: 8,
    backgroundColor: '#ffffff',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 4, // Shadow for Android
    borderRadius: 4,
    alignItems: 'center'
  },
  img: {
    height: 42,
    width: 42,
    margin: 4,
  },
});


export const modalStyles = StyleSheet.create({
  editButton: {
    marginTop: 8,
    padding: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff6666',
    borderRadius: 10,
    alignSelf: 'center',
  },
  saveButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#d9ead3',
    borderRadius: 10,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 4, // Shadow for Android
    borderRadius: 4,
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
    marginHorizontal: 10
  },
  selectedCard: {
    backgroundColor: '#bbeccc',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 4, // Shadow for Android
    borderRadius: 8,
  },
  iconList: {
  },
  icon: {
    width: 28,
    height: 28,
    margin: 2,
    verticalAlign: 'middle',
    opacity: 0.7
  },
  selected: {
    opacity: 1,
  },
});

export const beaconStyles = StyleSheet.create({
  beaconNameText: {
  },
  beaconDetailsText: {
    marginBottom: 8,
  },
  beaconHeader: {
    paddingBottom: 8,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
  },
  beaconCard: {
    padding: 16,
    backgroundColor: '#f3f3f3',
    borderRadius: 4,
    marginBottom: 8
  },
  icon: {
    width: 36,
    height: 36,
    alignSelf: 'center',
    marginEnd: 8
  },
  activityView: {
    padding: 8,
    marginTop: 8
  },
});