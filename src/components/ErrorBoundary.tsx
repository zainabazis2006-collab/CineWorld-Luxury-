import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, ShieldAlert, Film } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in CineWorld luxury applet:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center p-6 relative overflow-hidden">
          {/* Ambient background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00D1FF]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-md w-full bg-[#0d0d18] border border-white/15 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center shadow-lg">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00D1FF] uppercase bg-[#00D1FF]/10 px-3 py-1 rounded-full border border-[#00D1FF]/30">
                Safe Recovery Mode
              </span>
              <h2 className="text-2xl font-black italic uppercase text-white tracking-wide">
                Playback Interrupted
              </h2>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Our luxury cinema projection engine encountered a temporary render exception. We can seamlessly restore your session.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReset}
                className="w-full py-3.5 bg-gradient-to-r from-[#00D1FF] to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(0,209,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Restore Theater Session</span>
              </button>

              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                }}
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 font-mono text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Film className="w-3.5 h-3.5 text-[#00D1FF]" />
                <span>Continue Browsing Vault</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
