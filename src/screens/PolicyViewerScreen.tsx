import React from 'react';
import { WebView } from 'react-native-webview';

const PolicyViewerScreen = () => (
  <WebView source={{ uri: 'https://example.com/audit-policy.pdf' }} />
);

export default PolicyViewerScreen;