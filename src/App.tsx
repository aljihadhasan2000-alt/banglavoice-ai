import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import VoiceGenerator from "./pages/VoiceGenerator";
import TitleGenerator from "./pages/TitleGenerator";
import HookGenerator from "./pages/HookGenerator";
import CaptionGenerator from "./pages/CaptionGenerator";
import ScriptGenerator from "./pages/ScriptGenerator";
import HashtagGenerator from "./pages/HashtagGenerator";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <Layout>{children}</Layout>;
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0a0a0a',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tools/voice" element={<ProtectedRoute><VoiceGenerator /></ProtectedRoute>} />
          <Route path="/tools/titles" element={<ProtectedRoute><TitleGenerator /></ProtectedRoute>} />
          <Route path="/tools/hooks" element={<ProtectedRoute><HookGenerator /></ProtectedRoute>} />
          <Route path="/tools/captions" element={<ProtectedRoute><CaptionGenerator /></ProtectedRoute>} />
          <Route path="/tools/scripts" element={<ProtectedRoute><ScriptGenerator /></ProtectedRoute>} />
          <Route path="/tools/hashtags" element={<ProtectedRoute><HashtagGenerator /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
