import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import axios from 'axios';
import { UILoadingMessage } from '@/components/atoms'; // Ensure UILoadingMessage component exists

export default function LectureScreen() {
  const navigation = useRouter();
  const { title, content } = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioPath, setAudioPath] = useState<string | null>(null);

  const baseSize = 150;
  const circleScale = useSharedValue(1);


  const animatedCircleStyle = useAnimatedStyle(() => ({
    width: baseSize,
    height: baseSize,
    borderRadius: baseSize / 2,
    transform: [{ scale: circleScale.value }],
  }));

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const generateVoiceover = async (text: string) => {
    setLoading(true);
    try {
      const first38Words = text.split(' ').slice(0, 38).join(' ');
      
      // Call TTS API to generate voiceover
      const response = await axios.post('http://127.0.0.1:6969/run_tts_script', {
        tts_text: first38Words,
        tts_voice: 'en-US-GuyNeural',
        tts_rate: 2,
        pitch: 0,
        filter_radius: 3,
        index_rate: 0.75,
        volume_envelope: 1,
        protect: 0.5,
        hop_length: 128,
        f0_method: 'rmvpe',
        output_tts_path: '/path/to/output.mp3',
        output_rvc_path: '/path/to/output_rvc.mp3',
        pth_path: 'logs/Senti/Senti.pth',
        index_path: 'logs/Senti/added_IVF277_Flat_nprobe_1_Senti_v2.index',
        split_audio: false,
        f0_autotune: false,
        clean_audio: true,
        clean_strength: 0.5,
        export_format: 'mp3',
        upscale_audio: false,
        f0_file: null,
        embedder_model: 'contentvec',
        embedder_model_custom: null,
      });

      const { output_rvc_path } = response.data; // Assuming response contains path
      setAudioPath(output_rvc_path);
      loadAudio(output_rvc_path); // Load audio once it's generated
      console.log('Voiceover created at:', output_rvc_path);
    } catch (error) {
      console.error('Error generating voiceover:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAudio = async (path: string) => {
    try {
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  useEffect(() => {
    if (content) {
      generateVoiceover(content as string);
    }
  }, [content]);

  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.circleContainer}>
        <Animated.View style={[styles.soundCircle, animatedCircleStyle]} />
        {isPlaying && <UILoadingMessage />}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => console.log('Back 10 seconds')} style={styles.controlButton}>
          <Ionicons name="play-back-outline" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
          <Ionicons name={isPlaying ? 'pause-outline' : 'play-outline'} size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('Forward 10 seconds')} style={styles.controlButton}>
          <Ionicons name="play-forward-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {audioPath && (
        <View style={styles.audioContainer}>
          <Text style={styles.audioText}>Voiceover generated at: {audioPath}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
    marginBottom: 10,
  },
  soundCircle: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  audioContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  audioText: {
    fontSize: 16,
    color: '#333',
  },
});
