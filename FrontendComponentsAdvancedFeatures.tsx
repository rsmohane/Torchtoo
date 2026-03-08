// ============================================
// 🚀 ADVANCED FEATURES - REACT COMPONENTS
// ============================================

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import './AdvancedFeatures.css';

// ============================================
// 1. DEVICE SCANNER COMPONENT
// ============================================

export const DeviceScannerComponent: React.FC = () => {
  const [scanResults, setScanResults] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();

  const scanDevice = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/device/scan',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setScanResults(response.data.data);
    } catch (error) {
      console.error('Device scan failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const listDevices = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/device/list',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDevices(response.data.data);
    } catch (error) {
      console.error('Failed to list devices:', error);
    }
  };

  useEffect(() => {
    listDevices();
  }, []);

  return (
    <div className="device-scanner-container">
      <div className="card">
        <h2>🖥️ Device Scanner</h2>
        <button onClick={scanDevice} disabled={loading} className="btn-primary">
          {loading ? 'Scanning...' : 'Scan Device'}
        </button>

        {scanResults && (
          <div className="scan-results">
            <h3>Device Information</h3>
            <div className="device-info-grid">
              <div className="info-item">
                <label>Device ID</label>
                <value>{scanResults.deviceInfo.deviceId}</value>
              </div>
              <div className="info-item">
                <label>OS</label>
                <value>{scanResults.deviceInfo.osName} {scanResults.deviceInfo.osVersion}</value>
              </div>
              <div className="info-item">
                <label>Browser</label>
                <value>{scanResults.deviceInfo.browserName} {scanResults.deviceInfo.browserVersion}</value>
              </div>
              <div className="info-item">
                <label>Screen Resolution</label>
                <value>{scanResults.deviceInfo.screen}</value>
              </div>
              <div className="info-item">
                <label>Timezone</label>
                <value>{scanResults.deviceInfo.timezone}</value>
              </div>
              <div className="info-item">
                <label>Trust Level</label>
                <value className={`trust-${scanResults.trustLevel}`}>
                  {scanResults.trustLevel}
                </value>
              </div>
            </div>
          </div>
        )}

        <div className="registered-devices">
          <h3>Registered Devices ({devices.length})</h3>
          <div className="device-list">
            {devices.map((device) => (
              <div key={device.deviceId} className="device-card">
                <div className="device-header">
                  <h4>{device.deviceName || device.osName}</h4>
                  <span className={`badge ${device.trustLevel.toLowerCase()}`}>
                    {device.trustLevel}
                  </span>
                </div>
                <div className="device-details">
                  <p><strong>OS:</strong> {device.osName}</p>
                  <p><strong>Last Seen:</strong> {new Date(device.lastSeen).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 2. LOCATION TRACKER COMPONENT
// ============================================

export const LocationTrackerComponent: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const [locationAnalysis, setLocationAnalysis] = useState(null);
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const { token } = useAuthStore();

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const response = await axios.post(
              'http://localhost:5000/api/location/update',
              {
                latitude,
                longitude,
                accuracy: position.coords.accuracy,
                city: 'Unknown',
                country: 'Unknown'
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setCurrentLocation(response.data.data);
          } catch (error) {
            console.error('Location update failed:', error);
          }
        }
      );
    }
  };

  const getLocationHistory = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/location/history',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLocationHistory(response.data.data);
    } catch (error) {
      console.error('Failed to fetch location history:', error);
    }
  };

  const analyzeLocationPattern = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/location/analysis',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLocationAnalysis(response.data.data);
    } catch (error) {
      console.error('Location analysis failed:', error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    getLocationHistory();
    analyzeLocationPattern();
  }, []);

  return (
    <div className="location-tracker-container">
      <div className="card">
        <h2>📍 Location Tracker</h2>

        {currentLocation && (
          <div className="current-location">
            <h3>Current Location</h3>
            <div className="location-info">
              <p><strong>City:</strong> {currentLocation.city}</p>
              <p><strong>Country:</strong> {currentLocation.country}</p>
              <p><strong>Latitude:</strong> {currentLocation.latitude.toFixed(4)}</p>
              <p><strong>Longitude:</strong> {currentLocation.longitude.toFixed(4)}</p>
              <p><strong>Accuracy:</strong> {currentLocation.accuracy.toFixed(0)}m</p>
            </div>
          </div>
        )}

        {locationAnalysis && (
          <div className="location-analysis">
            <h3>Location Analysis</h3>
            <div className="analysis-grid">
              <div className="analysis-item">
                <label>Total Locations</label>
                <value>{locationAnalysis.totalLocations}</value>
              </div>
              <div className="analysis-item">
                <label>Unique Countries</label>
                <value>{locationAnalysis.uniqueCountries}</value>
              </div>
              <div className="analysis-item">
                <label>Most Frequent City</label>
                <value>{locationAnalysis.mostFrequentCity}</value>
              </div>
              <div className="analysis-item">
                <label>Pattern</label>
                <value className={`pattern-${locationAnalysis.pattern.toLowerCase()}`}>
                  {locationAnalysis.pattern}
                </value>
              </div>
            </div>
          </div>
        )}

        <div className="location-history">
          <h3>Location History</h3>
          <div className="history-list">
            {locationHistory.slice(0, 10).map((location) => (
              <div key={location.id} className="history-item">
                <div className="location-header">
                  <h4>{location.city}, {location.country}</h4>
                  <span className="timestamp">
                    {new Date(location.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="coordinates">
                  {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 3. LANGUAGE TRANSLATOR COMPONENT
// ============================================

export const LanguageTranslatorComponent: React.FC = () => {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();

  useEffect(() => {
    fetchSupportedLanguages();
  }, []);

  const fetchSupportedLanguages = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/translation/supported-languages'
      );
      setLanguages(response.data.data);
    } catch (error) {
      console.error('Failed to fetch languages:', error);
    }
  };

  const translate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/translation/translate',
        {
          text,
          targetLanguage
        }
      );
      setTranslatedText(response.data.data.translatedText);
      setDetectedLanguage(response.data.data.sourceLanguage);
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const detectLanguage = async () => {
    if (!text.trim()) return;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/translation/detect',
        { text }
      );
      setDetectedLanguage(response.data.data.detectedLanguage);
    } catch (error) {
      console.error('Language detection failed:', error);
    }
  };

  return (
    <div className="translator-container">
      <div className="card">
        <h2>🌍 Language Translator</h2>

        <div className="translator-grid">
          <div className="translator-panel">
            <h3>Source Text</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to translate..."
              className="translator-textarea"
            />
            <div className="translator-actions">
              <button onClick={detectLanguage} className="btn-secondary">
                Detect Language
              </button>
            </div>
            {detectedLanguage && (
              <p className="detected-language">
                Detected: <strong>{detectedLanguage}</strong>
              </p>
            )}
          </div>

          <div className="translator-panel">
            <h3>Translated Text</h3>
            <textarea
              value={translatedText}
              readOnly
              placeholder="Translation will appear here..."
              className="translator-textarea"
            />
            <div className="language-selector">
              <label>Target Language:</label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={translate}
              disabled={loading || !text.trim()}
              className="btn-primary"
            >
              {loading ? 'Translating...' : '→ Translate'}
            </button>
          </div>
        </div>

        <div className="supported-languages">
          <h3>Supported Languages ({languages.length})</h3>
          <div className="language-grid">
            {languages.map((lang) => (
              <div key={lang.code} className="language-tag">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 4. SECURITY CHECKER COMPONENT
// ============================================

export const SecurityCheckerComponent: React.FC = () => {
  const [securityCheck, setSecurityCheck] = useState(null);
  const [vulnerabilities, setVulnerabilities] = useState(null);
  const [threats, setThreats] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();

  const runSecurityCheck = async () => {
    setLoading(true);
    try {
      const [checkRes, vulnRes, threatRes] = await Promise.all([
        axios.post(
          'http://localhost:5000/api/security/check',
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.post(
          'http://localhost:5000/api/security/vulnerabilities',
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.post(
          'http://localhost:5000/api/security/threats',
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
      ]);

      setSecurityCheck(checkRes.data.data);
      setVulnerabilities(vulnRes.data.data);
      setThreats(threatRes.data.data);
    } catch (error) {
      console.error('Security check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSecurityCheck();
  }, []);

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    return 'poor';
  };

  return (
    <div className="security-checker-container">
      <div className="card">
        <h2>🔒 Security Checker</h2>

        {securityCheck && (
          <div className="security-overview">
            <div className={`security-score-circle ${getScoreBadge(securityCheck.overallScore)}`}>
              <div className="score">{securityCheck.overallScore}</div>
              <div className="level">{securityCheck.securityLevel}</div>
            </div>

            <div className="security-checks">
              <h3>Security Checks</h3>
              {securityCheck.checks.map((check, index) => (
                <div key={index} className={`check-item ${check.status.toLowerCase()}`}>
                  <div className="check-header">
                    <h4>{check.name}</h4>
                    <span className={`badge-${check.status.toLowerCase()}`}>
                      {check.status}
                    </span>
                  </div>
                  <p className="check-details">{check.details}</p>
                  {check.recommendation && (
                    <div className="recommendation">
                      <strong>⚠️ Recommendation:</strong> {check.recommendation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {vulnerabilities && (
          <div className="vulnerabilities-section">
            <h3>Vulnerabilities Found: {vulnerabilities.vulnerabilityCount}</h3>
            <div className={`vulnerability-level ${vulnerabilities.riskLevel.toLowerCase()}`}>
              Risk Level: <strong>{vulnerabilities.riskLevel}</strong>
            </div>
            {vulnerabilities.vulnerabilities.length > 0 && (
              <ul className="vulnerability-list">
                {vulnerabilities.vulnerabilities.map((vuln, index) => (
                  <li key={index}>⚠️ {vuln}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {threats && (
          <div className="threats-section">
            <h3>Threat Analysis</h3>
            <div className={`threat-level ${threats.threatLevel.toLowerCase()}`}>
              Threat Level: <strong>{threats.threatLevel}</strong>
              <span className="threat-score">Score: {threats.threatScore}</span>
            </div>
            {threats.detectedThreats.length > 0 && (
              <ul className="threats-list">
                {threats.detectedThreats.map((threat, index) => (
                  <li key={index}>🚨 {threat}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button onClick={runSecurityCheck} disabled={loading} className="btn-primary">
          {loading ? 'Scanning...' : 'Run Full Security Check'}
        </button>
      </div>
    </div>
  );
};

// ============================================
// 5. AUTO ALERTS COMPONENT
// ============================================

export const AlertsComponent: React.FC = () => {
  const [alerts, setAlerts] = useState([]);
  const [alertStats, setAlertStats] = useState(null);
  const [filter, setFilter] = useState('all');
  const { token } = useAuthStore();

  useEffect(() => {
    fetchAlerts();
    fetchAlertStats();

    // Poll for new alerts every 30 seconds
    const interval = setInterval(() => {
      fetchAlerts();
      fetchAlertStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/alerts',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlerts(response.data.data);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    }
  };

  const fetchAlertStats = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/alerts/statistics',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlertStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch alert stats:', error);
    }
  };

  const acknowledgeAlert = async (alertId: string) => {
    try {
      await axios.post(
        `http://localhost:5000/api/alerts/${alertId}/acknowledge`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAlerts();
      fetchAlertStats();
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
    }
  };

  const getSeverityColor = (severity: number) => {
    if (severity === 4) return '#FF4444';
    if (severity === 3) return '#FF9900';
    if (severity === 2) return '#FFD700';
    return '#4CAF50';
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.severity === parseInt(filter));

  return (
    <div className="alerts-container">
      <div className="card">
        <h2>🚨 System Alerts</h2>

        {alertStats && (
          <div className="alert-statistics">
            <div className="stat-item">
              <label>Total Alerts</label>
              <value>{alertStats.totalAlerts}</value>
            </div>
            <div className="stat-item">
              <label>Unread</label>
              <value className="unread">{alertStats.unreadAlerts}</value>
            </div>
            <div className="stat-item">
              <label>Critical</label>
              <value className="critical">{alertStats.criticalAlerts}</value>
            </div>
            <div className="stat-item">
              <label>High</label>
              <value className="high">{alertStats.highAlerts}</value>
            </div>
          </div>
        )}

        <div className="alert-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({alerts.length})
          </button>
          <button
            className={`filter-btn ${filter === '4' ? 'active' : ''}`}
            onClick={() => setFilter('4')}
          >
            Critical ({alerts.filter(a => a.severity === 4).length})
          </button>
          <button
            className={`filter-btn ${filter === '3' ? 'active' : ''}`}
            onClick={() => setFilter('3')}
          >
            High ({alerts.filter(a => a.severity === 3).length})
          </button>
        </div>

        <div className="alerts-list">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert-item severity-${alert.severity} ${alert.isRead ? 'read' : 'unread'}`}
              style={{ borderLeft: `4px solid ${getSeverityColor(alert.severity)}` }}
            >
              <div className="alert-header">
                <h3>{alert.type}</h3>
                <span className="timestamp">
                  {new Date(alert.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="alert-message">{alert.message}</p>
              <div className="alert-actions">
                {!alert.isAcknowledged && (
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="btn-secondary"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// 6. REAL-TIME CHAT COMPONENT
// ============================================

export const ChatSupportComponent: React.FC = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [chatActive, setChatActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const startChat = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/chat/start',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSessionId(response.data.data.id);
      setChatActive(true);
      setMessages([{
        id: 'welcome',
        message: 'Welcome to support! How can we help you today?',
        isFromAgent: true,
        sentAt: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Failed to start chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      message: newMessage,
      isFromAgent: false,
      sentAt: new Date().toISOString()
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    try {
      await axios.post(
        `http://localhost:5000/api/chat/send`,
        {
          sessionId,
          message: newMessage
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Simulate agent response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          message: 'Thank you for your message. Our support team will respond shortly.',
          isFromAgent: true,
          sentAt: new Date().toISOString()
        }]);
      }, 1000);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="card">
        <h2>💬 Live Chat Support</h2>

        {!chatActive ? (
          <div className="chat-start">
            <p>Get instant support from our team</p>
            <button onClick={startChat} disabled={loading} className="btn-primary">
              {loading ? 'Starting...' : 'Start Chat'}
            </button>
          </div>
        ) : (
          <div className="chat-window">
            <div className="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.isFromAgent ? 'agent' : 'user'}`}
                >
                  <div className="message-content">
                    <p>{msg.message}</p>
                    <span className="timestamp">
                      {new Date(msg.sentAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="input-message"
              />
              <button onClick={sendMessage} className="btn-send">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// 7. AI SUGGESTIONS COMPONENT
// ============================================

export const AISuggestionsComponent: React.FC = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();

  useEffect(() => {
    fetchSuggestions();

    // Refresh suggestions every 5 minutes
    const interval = setInterval(fetchSuggestions, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:5000/api/dashboard/suggestions',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuggestions(response.data.data);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const executeSuggestion = (suggestion) => {
    window.location.href = suggestion.action;
  };

  return (
    <div className="suggestions-container">
      <div className="card">
        <div className="suggestions-header">
          <h2>🤖 AI Suggestions</h2>
          <button onClick={fetchSuggestions} disabled={loading} className="btn-refresh">
            {loading ? '...' : '↻'}
          </button>
        </div>

        {suggestions.length === 0 ? (
          <p className="no-suggestions">No suggestions at this time. Keep up the good work! ✨</p>
        ) : (
          <div className="suggestions-list">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={`suggestion-card priority-${suggestion.priority}`}
              >
                <div className="suggestion-header">
                  <h3>{suggestion.title}</h3>
                  <div className="suggestion-meta">
                    <span className="category">{suggestion.category}</span>
                    <span className="confidence">
                      {(suggestion.confidence * 100).toFixed(0)}% match
                    </span>
                  </div>
                </div>

                <p className="suggestion-description">{suggestion.description}</p>

                {suggestion.benefit && (
                  <div className="suggestion-benefit">
                    <strong>Potential Benefit:</strong> {suggestion.benefit}
                  </div>
                )}

                <button
                  onClick={() => executeSuggestion(suggestion)}
                  className="btn-suggestion"
                >
                  Take Action →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// 8. WORK AUTO-COMPLETION COMPONENT
// ============================================

export const WorkAutoCompletionComponent: React.FC = () => {
  const [workProcesses, setWorkProcesses] = useState([]);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();

  useEffect(() => {
    fetchWorkProcesses();
  }, []);

  const fetchWorkProcesses = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/work/processes',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWorkProcesses(response.data.data);
    } catch (error) {
      console.error('Failed to fetch work processes:', error);
    }
  };

  const getProcessProgress = async (processId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/work/${processId}/progress`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProgress(response.data.data);
      setSelectedProcess(processId);
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  };

  const autoCompleteWork = async (processId: string) => {
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/work/${processId}/auto-complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWorkProcesses();
      getProcessProgress(processId);
    } catch (error) {
      console.error('Auto-completion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="work-completion-container">
      <div className="card">
        <h2>⚙️ Work Auto-Completion</h2>

        <div className="work-grid">
          <div className="work-list">
            <h3>Active Work Processes</h3>
            {workProcesses.map((process) => (
              <div
                key={process.id}
                className={`work-item ${selectedProcess === process.id ? 'selected' : ''}`}
                onClick={() => getProcessProgress(process.id)}
              >
                <div className="work-title">{process.name}</div>
                <div className="work-progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${process.progress}%` }}
                  />
                </div>
                <div className="work-meta">
                  <span>{process.progress}%</span>
                  <span className={`status-${process.status.toLowerCase()}`}>
                    {process.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {progress && (
            <div className="work-details">
              <h3>{progress.processName}</h3>

              <div className="progress-section">
                <div className="progress-circle">
                  <svg viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      style={{
                        strokeDashoffset: 100 - progress.progress,
                        strokeDasharray: 100
                      }}
                    />
                  </svg>
                  <div className="progress-text">{progress.progress}%</div>
                </div>

                <div className="progress-info">
                  <p><strong>Status:</strong> {progress.status}</p>
                  <p><strong>Steps:</strong> {progress.completedSteps} / {progress.totalSteps}</p>
                  <p><strong>Time Remaining:</strong> {progress.estimatedTimeRemaining}</p>
                </div>
              </div>

              <div className="step-list">
                <h4>Steps</h4>
                {Array.from({ length: progress.totalSteps }).map((_, i) => (
                  <div key={i} className={`step-item ${i < progress.completedSteps ? 'completed' : ''}`}>
                    <span className="step-number">{i + 1}</span>
                    <span className="step-name">{progress.currentStep?.name || `Step ${i + 1}`}</span>
                    <span className="step-status">
                      {i < progress.completedSteps ? '✓' : '○'}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => autoCompleteWork(selectedProcess)}
                disabled={loading || progress.progress === 100}
                className="btn-primary"
              >
                {loading ? 'Processing...' : 'Auto-Complete Remaining'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// 9. DASHBOARD COMPONENT (Unified View)
// ============================================

export const AdvancedDashboardComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const { token } = useAuthStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/dashboard/data',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    }
  };

  return (
    <div className="advanced-dashboard">
      <div className="dashboard-header">
        <h1>🎯 Advanced Dashboard</h1>
        <div className="user-summary">
          {dashboardData && (
            <>
              <div className="trust-badge">
                <span className="label">Trust Score</span>
                <span className="value">{dashboardData.trustScore}</span>
              </div>
              <div className="alerts-badge">
                <span className="label">Unread Alerts</span>
                <span className="value">{dashboardData.unreadAlerts}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`tab ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          🔒 Security
        </button>
        <button
          className={`tab ${activeTab === 'devices' ? 'active' : ''}`}
          onClick={() => setActiveTab('devices')}
        >
          🖥️ Devices
        </button>
        <button
          className={`tab ${activeTab === 'location' ? 'active' : ''}`}
          onClick={() => setActiveTab('location')}
        >
          📍 Location
        </button>
        <button
          className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          💬 Support
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="tab-content">
            <AISuggestionsComponent />
            {dashboardData && (
              <div className="card">
                <h2>📈 Recent Activities</h2>
                <div className="activity-list">
                  {dashboardData.recentActivities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <span className="activity-type">{activity.type}</span>
                      <span className="activity-desc">{activity.description}</span>
                      <span className="activity-time">
                        {new Date(activity.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'security' && <SecurityCheckerComponent />}
        {activeTab === 'devices' && <DeviceScannerComponent />}
        {activeTab === 'location' && <LocationTrackerComponent />}
        {activeTab === 'chat' && <ChatSupportComponent />}
      </div>
    </div>
  );
};