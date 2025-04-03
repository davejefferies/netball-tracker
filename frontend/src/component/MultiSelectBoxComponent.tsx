import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  LayoutRectangle,
  findNodeHandle,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type MultiSelectBoxProps = {
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  style?: ViewStyle;
};

const MultiSelectBox: React.FC<MultiSelectBoxProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select items...',
  style,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<LayoutRectangle | null>(null);
  const inputRef = useRef<View>(null);

  const addOption = (option: string) => {
    if (!value.includes(option)) {
      onChange([...value, option]);
    }
    setShowOptions(false);
  };

  const removeOption = (option: string) => {
    onChange(value.filter((item) => item !== option));
  };

  const openDropdown = () => {
    if (inputRef.current) {
      const handle = findNodeHandle(inputRef.current);
      if (handle) {
        UIManager.measure(handle, (_x, _y, width, height, pageX, pageY) => {
          setDropdownPos({ x: pageX, y: pageY + height, width, height });
          setShowOptions(true);
        });
      }
    }
  };

  const filteredOptions = options.filter((opt) => !value.includes(opt));

  return (
    <>
      <View ref={inputRef} style={[styles.container, style]}>
        <TouchableOpacity onPress={openDropdown} activeOpacity={0.8} style={styles.inputWrapper}>
          {value.length === 0 ? (
            <Text style={styles.placeholder}>{placeholder}</Text>
          ) : (
            <View style={styles.selectedContainer}>
              {value.map((item) => (
                <View key={item} style={styles.chip}>
                  <Text style={styles.chipText}>{item}</Text>
                  <TouchableOpacity onPress={() => removeOption(item)}>
                    <Ionicons name="close-circle" size={18} color="#777" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Modal transparent visible={showOptions} animationType="none">
  <TouchableWithoutFeedback onPress={() => setShowOptions(false)}>
    <View style={styles.modalOverlay}>
      {dropdownPos && (
        <TouchableWithoutFeedback onPress={() => {}}>
          <View
            style={[
              styles.dropdown,
              {
                position: 'absolute',
                top: dropdownPos.y,
                left: dropdownPos.x,
                width: dropdownPos.width,
              },
            ]}
          >
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={true}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.option} onPress={() => addOption(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              style={{ height: 200, overflow: 'auto', flexGrow: 0 }}
              contentContainerStyle={{ paddingVertical: 4 }}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  </TouchableWithoutFeedback>
</Modal>
    </>
  );
};

export default MultiSelectBox;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputWrapper: {
    flex: 1, 
    borderWidth: 1, 
    padding: 8, 
    borderRadius: 6
  },
  placeholder: {
    color: '#999',
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    paddingHorizontal: 10,
    borderRadius: 16,
    marginRight: 6,
  },
  chipText: {
    marginRight: 6,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 10,
    zIndex: 9999,
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
