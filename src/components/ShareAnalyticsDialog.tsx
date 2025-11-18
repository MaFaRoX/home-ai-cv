import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useAnalytics, TimeRange } from "./AnalyticsContext";
import { useLanguage } from "../App";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Share2, Trash2, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, Calendar, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ShareAnalyticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TimeRangeType = 'today' | 'week' | 'month' | 'all';

export function ShareAnalyticsDialog({ open, onOpenChange }: ShareAnalyticsDialogProps) {
  const { getShareStats, getTotalShares, getTrendData, getComparison, clearAnalytics, shareHistory } = useAnalytics();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'chart' | 'trends'>('overview');
  const [timeRangeType, setTimeRangeType] = useState<TimeRangeType>('all');

  // Calculate time range based on selection
  const timeRange = useMemo((): TimeRange | undefined => {
    const now = Date.now();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch (timeRangeType) {
      case 'today':
        return { start: today.getTime(), end: now };
      case 'week':
        const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
        return { start: weekAgo.getTime(), end: now };
      case 'month':
        const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
        return { start: monthAgo.getTime(), end: now };
      case 'all':
      default:
        return undefined;
    }
  }, [timeRangeType]);

  const stats = getShareStats(timeRange);
  const totalShares = getTotalShares(timeRange);
  const sortedStats = [...stats].sort((a, b) => b.count - a.count);

  // Get comparison data
  const comparison = useMemo(() => {
    if (!timeRange) return null;
    return getComparison(timeRange);
  }, [timeRange, getComparison]);

  // Get trend data
  const trendData = useMemo(() => {
    if (!timeRange) {
      // For 'all', use the entire history
      const firstEvent = shareHistory.length > 0 ? Math.min(...shareHistory.map(e => e.timestamp)) : Date.now();
      const fullRange: TimeRange = { start: firstEvent, end: Date.now() };
      return getTrendData(fullRange, 'day');
    }
    
    const groupBy = timeRangeType === 'today' ? 'day' : timeRangeType === 'week' ? 'day' : 'day';
    return getTrendData(timeRange, groupBy);
  }, [timeRange, timeRangeType, getTrendData, shareHistory]);

  const handleClearAnalytics = () => {
    if (confirm(t.confirmClearAnalytics || 'Bạn có chắc muốn xóa toàn bộ dữ liệu analytics?')) {
      clearAnalytics();
      toast.success(t.analyticsClearedSuccess || 'Đã xóa dữ liệu analytics');
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook size={20} className="text-blue-600" />;
      case 'twitter':
        return <Twitter size={20} className="text-sky-500" />;
      case 'linkedin':
        return <Linkedin size={20} className="text-blue-700" />;
      case 'whatsapp':
        return <div className="w-5 h-5 text-green-600">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>;
      case 'email':
        return <Mail size={20} className="text-gray-600" />;
      case 'copylink':
        return <LinkIcon size={20} className="text-purple-600" />;
      default:
        return <Share2 size={20} />;
    }
  };

  // Calculate percentage
  const getPercentage = (count: number) => {
    if (totalShares === 0) return 0;
    return ((count / totalShares) * 100).toFixed(1);
  };

  // Prepare data for charts
  const chartData = sortedStats.filter(s => s.count > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="text-purple-600" />
            {t.shareAnalytics || 'Thống kê Chia sẻ'}
          </DialogTitle>
          <DialogDescription>
            {t.shareAnalyticsDesc || 'Theo dõi hiệu suất chia sẻ trên các nền tảng mạng xã hội'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Time Range Selector */}
          <div className="flex items-center gap-3">
            <Calendar className="text-gray-500" size={20} />
            <Select value={timeRangeType} onValueChange={(v: string) => setTimeRangeType(v as TimeRangeType)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">{t.timeRangeToday || 'Hôm nay'}</SelectItem>
                <SelectItem value="week">{t.timeRangeWeek || '7 ngày qua'}</SelectItem>
                <SelectItem value="month">{t.timeRangeMonth || '30 ngày qua'}</SelectItem>
                <SelectItem value="all">{t.timeRangeAll || 'Toàn bộ'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Summary Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Total Shares Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Share2 className="text-purple-600" size={20} />
                  {t.totalShares || 'Tổng số lượt chia sẻ'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-extrabold text-purple-600">
                  {totalShares}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {t.sharesAcrossPlatforms || 'lượt chia sẻ trên'} {chartData.length} {t.platforms || 'nền tảng'}
                </p>
              </CardContent>
            </Card>

            {/* Comparison Card */}
            {comparison && (
              <Card className={`bg-gradient-to-br border-2 ${
                comparison.change > 0 
                  ? 'from-green-50 to-emerald-50 border-green-200' 
                  : comparison.change < 0 
                  ? 'from-red-50 to-orange-50 border-red-200'
                  : 'from-gray-50 to-slate-50 border-gray-200'
              }`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {comparison.change > 0 ? (
                      <TrendingUp className="text-green-600" size={20} />
                    ) : comparison.change < 0 ? (
                      <TrendingDown className="text-red-600" size={20} />
                    ) : (
                      <Minus className="text-gray-600" size={20} />
                    )}
                    {t.comparison || 'So sánh'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className={`text-4xl font-extrabold ${
                      comparison.change > 0 
                        ? 'text-green-600' 
                        : comparison.change < 0 
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}>
                      {comparison.change > 0 ? '+' : ''}{comparison.change}
                    </div>
                    <div className="flex flex-col">
                      <div className={`flex items-center gap-1 text-lg font-bold ${
                        comparison.change > 0 
                          ? 'text-green-600' 
                          : comparison.change < 0 
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}>
                        {comparison.change > 0 ? (
                          <ArrowUp size={16} />
                        ) : comparison.change < 0 ? (
                          <ArrowDown size={16} />
                        ) : (
                          <Minus size={16} />
                        )}
                        {Math.abs(comparison.changePercent).toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-600">
                        {t.vsPrevious || 'so với kỳ trước'}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {t.previousPeriod || 'Kỳ trước'}: {comparison.previous}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {totalShares === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Share2 size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">
                  {t.noShareDataYet || 'Chưa có dữ liệu chia sẻ. Hãy chia sẻ ứng dụng để bắt đầu theo dõi!'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Tabs value={activeTab} onValueChange={(v: string) => setActiveTab(v as 'overview' | 'chart' | 'trends')} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">{t.overview || 'Tổng quan'}</TabsTrigger>
                <TabsTrigger value="chart">{t.charts || 'Biểu đồ'}</TabsTrigger>
                <TabsTrigger value="trends">{t.trends || 'Xu hướng'}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-3 mt-4">
                {sortedStats.map((stat, index) => (
                  stat.count > 0 && (
                    <Card key={stat.platform} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                              {getPlatformIcon(stat.platform)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{stat.label}</h3>
                                {index === 0 && (
                                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                                    👑 {t.topPlatform || 'Top'}
                                  </span>
                                )}
                              </div>
                              <div className="mt-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className="h-full transition-all duration-500 rounded-full"
                                  style={{
                                    width: `${getPercentage(stat.count)}%`,
                                    backgroundColor: stat.color,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold" style={{ color: stat.color }}>
                              {stat.count}
                            </div>
                            <div className="text-xs text-gray-500">
                              {getPercentage(stat.count)}%
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                ))}
              </TabsContent>

              <TabsContent value="chart" className="space-y-6 mt-4">
                {/* Bar Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.sharesByPlatform || 'Lượt chia sẻ theo nền tảng'}</CardTitle>
                    <CardDescription>{t.barChartDesc || 'Biểu đồ cột so sánh'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name={t.shares || 'Lượt chia sẻ'} radius={[8, 8, 0, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.platformDistribution || 'Phân bố theo nền tảng'}</CardTitle>
                    <CardDescription>{t.pieChartDesc || 'Biểu đồ tròn tỷ lệ phần trăm'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.label}: ${getPercentage(entry.count)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends" className="space-y-6 mt-4">
                {/* Time Series Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.sharesTrend || 'Xu hướng chia sẻ'}</CardTitle>
                    <CardDescription>{t.sharesTrendDesc || 'Biểu đồ xu hướng theo thời gian'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {trendData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={trendData}>
                          <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => {
                              const date = new Date(value);
                              return `${date.getMonth() + 1}/${date.getDate()}`;
                            }}
                          />
                          <YAxis />
                          <Tooltip 
                            labelFormatter={(value) => {
                              const date = new Date(value);
                              return date.toLocaleDateString();
                            }}
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="total" 
                            name={t.totalShares || 'Tổng'}
                            stroke="#8B5CF6" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorTotal)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        {t.noTrendData || 'Không có dữ liệu xu hướng'}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Platform Trends - Stacked Area Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.platformTrends || 'Xu hướng theo nền tảng'}</CardTitle>
                    <CardDescription>{t.platformTrendsDesc || 'So sánh xu hướng từng nền tảng'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {trendData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => {
                              const date = new Date(value);
                              return `${date.getMonth() + 1}/${date.getDate()}`;
                            }}
                          />
                          <YAxis />
                          <Tooltip 
                            labelFormatter={(value) => {
                              const date = new Date(value);
                              return date.toLocaleDateString();
                            }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="facebook" 
                            name="Facebook" 
                            stroke="#1877F2" 
                            strokeWidth={2}
                            dot={{ fill: '#1877F2' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="twitter" 
                            name="Twitter" 
                            stroke="#1DA1F2" 
                            strokeWidth={2}
                            dot={{ fill: '#1DA1F2' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="linkedin" 
                            name="LinkedIn" 
                            stroke="#0A66C2" 
                            strokeWidth={2}
                            dot={{ fill: '#0A66C2' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="whatsapp" 
                            name="WhatsApp" 
                            stroke="#25D366" 
                            strokeWidth={2}
                            dot={{ fill: '#25D366' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="email" 
                            name="Email" 
                            stroke="#6B7280" 
                            strokeWidth={2}
                            dot={{ fill: '#6B7280' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="copylink" 
                            name="Copy Link" 
                            stroke="#8B5CF6" 
                            strokeWidth={2}
                            dot={{ fill: '#8B5CF6' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        {t.noTrendData || 'Không có dữ liệu xu hướng'}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Peak Performance Stats */}
                {trendData.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.peakPerformance || 'Hiệu suất đỉnh'}</CardTitle>
                      <CardDescription>{t.peakPerformanceDesc || 'Ngày có nhiều lượt chia sẻ nhất'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const peakDay = [...trendData].sort((a, b) => b.total - a.total)[0];
                        if (!peakDay || peakDay.total === 0) {
                          return <div className="text-gray-500">{t.noPeakData || 'Chưa có dữ liệu'}</div>;
                        }
                        return (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                              <div>
                                <div className="text-sm text-gray-600">{t.bestDay || 'Ngày tốt nhất'}</div>
                                <div className="text-2xl font-bold text-purple-600">
                                  {new Date(peakDay.date).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-600">{t.shares || 'Lượt chia sẻ'}</div>
                                <div className="text-3xl font-extrabold text-purple-600">
                                  {peakDay.total}
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {Object.entries(peakDay)
                                .filter(([key]) => !['date', 'timestamp', 'total'].includes(key))
                                .sort(([, a], [, b]) => (b as number) - (a as number))
                                .slice(0, 3)
                                .map(([platform, count]) => (
                                  <div key={platform} className="p-2 bg-white rounded border text-center">
                                    <div className="text-xs text-gray-500 capitalize">{platform}</div>
                                    <div className="text-lg font-bold">{count as number}</div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAnalytics}
              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              disabled={totalShares === 0}
            >
              <Trash2 size={16} />
              {t.clearAnalytics || 'Xóa dữ liệu'}
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              {t.close || 'Đóng'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
