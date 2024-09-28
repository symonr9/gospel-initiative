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
    borderRadius: 4,
    padding: 4,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
    marginVertical: 6
  }
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
    minHeight: 120,
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
    height: 52,
    width: 52,
    margin: 4,
  },
});
