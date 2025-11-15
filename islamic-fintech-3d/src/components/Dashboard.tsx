export function Dashboard() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="flex justify-between items-center">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/60 backdrop-blur-md px-6 py-3 rounded-lg border border-neon-blue/30">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-islamic-gold">
              Islamic Fintech Platform
            </h1>
          </div>
          
          <div className="flex gap-4">
            <MetricCard title="Sharia Compliance" value="100%" color="text-islamic-gold" />
            <MetricCard title="Active Users" value="2.4M" color="text-neon-blue" />
            <MetricCard title="Transactions" value="$1.2B" color="text-green-400" />
          </div>
        </div>
      </div>

      {/* Bottom Dashboard */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="grid grid-cols-4 gap-4">
          <DashboardCard
            title="Halal Assets"
            value="$450M"
            change="+12.5%"
            icon="💎"
          />
          <DashboardCard
            title="Risk Sharing"
            value="98.2%"
            change="+2.1%"
            icon="🤝"
          />
          <DashboardCard
            title="Blockchain Verified"
            value="15.3K"
            change="+8.7%"
            icon="⛓️"
          />
          <DashboardCard
            title="AI Insights"
            value="Real-time"
            change="Active"
            icon="🦉"
          />
        </div>
      </div>

      {/* Side Panel */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2">
        <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/60 backdrop-blur-md p-4 rounded-lg border border-neon-blue/30 space-y-4">
          <StatusIndicator label="Network" status="online" />
          <StatusIndicator label="Security" status="online" />
          <StatusIndicator label="Compliance" status="online" />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md px-4 py-2 rounded-lg border border-neon-blue/20">
      <div className="text-xs text-gray-400 mb-1">{title}</div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

function DashboardCard({ 
  title, 
  value, 
  change, 
  icon 
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: string;
}) {
  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-md p-4 rounded-lg border border-neon-blue/30 hover:border-islamic-gold/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-2">
        <div className="text-2xl">{icon}</div>
        <div className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
          {change}
        </div>
      </div>
      <div className="text-sm text-gray-400 mb-1">{title}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function StatusIndicator({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
      <div className="text-xs text-gray-300">{label}</div>
    </div>
  );
}
