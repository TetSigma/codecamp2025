import React from "react";
import { Modal, View, TouchableOpacity} from "react-native";
import { UIText } from "../atoms"
import { StyleSheet } from "react-native-unistyles";


type UIModalProps = {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export const UIModal: React.FC<UIModalProps> = ({ visible, title, onClose, children }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <UIText variant="body">
              X
            </UIText>
          </TouchableOpacity>
          <UIText variant="heading" style={styles.title}>
            {title}
          </UIText>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create((theme)=>({
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: theme.colors.background,
      padding: 16,
      borderRadius: theme.borderRadius.sm,
      width: "80%",
      maxWidth: 400,
    },
    closeButton: {
      position: "absolute",
      // top: theme.spacing.m,
      // right: theme.spacing.m,
      // padding: theme.spacing.s,
    },
    title: {
      fontWeight: "bold",
      // marginBottom: theme.spacing.m,
    },
})) 

